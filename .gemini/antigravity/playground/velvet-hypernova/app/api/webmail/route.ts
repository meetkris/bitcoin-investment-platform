import { NextResponse } from 'next/server';
import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';

// Helper to fetch messages by UID using underlying node-imap
function fetchMessagesByUid(connection: any, uids: number[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
        // Ensure UIDs are numbers
        const uidList = uids.map(u => Number(u));

        // Use the underlying node-imap fetch method with id: true (treat source as UIDs)
        const fetch = connection.imap.fetch(uidList, {
            bodies: ['HEADER', 'TEXT', ''],
            struct: true
        });

        const messages: any[] = [];

        fetch.on('message', (msg: any) => {
            const message: any = { parts: [], attributes: {} };

            msg.on('body', (stream: any, info: any) => {
                let buffer = '';
                stream.on('data', (chunk: any) => { buffer += chunk.toString('utf8'); });
                stream.once('end', () => {
                    message.parts.push({ which: info.which, body: buffer });
                });
            });

            msg.once('attributes', (attrs: any) => {
                message.attributes = attrs;
            });

            msg.once('end', () => {
                messages.push(message);
            });
        });

        fetch.once('error', (err: any) => {
            console.error('[Webmail] Fetch error:', err);
            reject(err);
        });

        fetch.once('end', () => {
            resolve(messages);
        });
    });
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const folder = searchParams.get('folder') || 'INBOX';
        const limit = parseInt(searchParams.get('limit') || '50');

        console.log(`[Webmail] Fetching emails from folder: ${folder}, limit: ${limit}`);

        const config = {
            imap: {
                user: process.env.EMAIL_USER!,
                password: process.env.EMAIL_PASSWORD!,
                host: process.env.EMAIL_IMAP_HOST || 'imap.gmail.com',
                port: parseInt(process.env.EMAIL_IMAP_PORT || '993'),
                tls: true,
                tlsOptions: { rejectUnauthorized: false },
                authTimeout: 10000,
            },
        };

        console.log('[Webmail] Connecting to IMAP...');
        const connection = await imaps.connect(config);
        console.log('[Webmail] Connected. Opening box...');

        const box: any = await connection.openBox(folder);
        console.log('[Webmail] Box opened.');

        const total = box.messages.total;
        console.log(`[Webmail] Total messages in box: ${total}`);

        if (total === 0) {
            console.log('[Webmail] Box is empty.');
            connection.end();
            return NextResponse.json({ emails: [] });
        }

        // 1. Fetch only UIDs for all messages (minimal fetch)
        console.log(`[Webmail] Fetching UIDs for all messages...`);

        const uidMessages = await connection.search(['ALL'], {
            bodies: ['HEADER.FIELDS (DATE)'], // Minimal fetch
            struct: false
        });

        console.log(`[Webmail] Found ${uidMessages.length} messages. Sorting...`);

        // Sort by seqno descending (newest first)
        const sortedMessages = uidMessages.sort((a: any, b: any) => (b.seqNo || b.seqno) - (a.seqNo || a.seqno));

        // Take the top N messages
        const recentMessages = sortedMessages.slice(0, limit);
        const uids = recentMessages.map(m => m.attributes.uid);

        if (uids.length === 0) {
            connection.end();
            return NextResponse.json({ emails: [] });
        }

        console.log(`[Webmail] Fetching bodies for ${uids.length} UIDs: ${uids.join(',').substring(0, 50)}...`);

        // 2. Fetch bodies for the specific UIDs using direct fetch
        const messages = await fetchMessagesByUid(connection, uids);

        console.log(`[Webmail] Fetched ${messages.length} full messages.`);

        const emails = await Promise.all(
            messages.map(async (item) => {
                const all = item.parts.find((part: any) => part.which === '');
                const id = item.attributes.uid;

                const fullBody = all?.body || '';

                let parsed;
                try {
                    parsed = await simpleParser(fullBody);
                } catch (e) {
                    console.error('[Webmail] Parse error for message:', id, e);
                    return null;
                }

                return {
                    id: id,
                    from: (parsed.from as any)?.text || 'Unknown',
                    to: (parsed.to as any)?.text || '',
                    subject: parsed.subject || '(No Subject)',
                    date: parsed.date || new Date(),
                    text: parsed.text || '',
                    html: parsed.html || '',
                    attachments: parsed.attachments?.map(a => ({
                        filename: a.filename,
                        size: a.size,
                        contentType: a.contentType
                    })) || []
                };
            })
        );

        connection.end();

        // Filter nulls and sort again
        const validEmails = emails
            .filter(e => e !== null)
            .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime());

        console.log(`[Webmail] Successfully processed ${validEmails.length} emails.`);

        return NextResponse.json({ emails: validEmails });
    } catch (error: any) {
        console.error('[Webmail] IMAP Error:', error);
        return NextResponse.json(
            { error: `Failed to fetch emails: ${error.message || error}` },
            { status: 500 }
        );
    }
}
