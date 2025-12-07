require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const runSeedSQL = async () => {
    console.log('🌱 Starting property seeding process...\n');

    try {
        // Read the SQL file
        const sqlPath = path.join(__dirname, 'seed_properties.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        // Split by INSERT statements and execute them
        const insertStatements = sqlContent.split('INSERT INTO public.properties');

        console.log(`Found ${insertStatements.length - 1} INSERT statements\n`);

        let successCount = 0;
        let errorCount = 0;

        // Skip the first element (it's the comment/header before first INSERT)
        for (let i = 1; i < insertStatements.length; i++) {
            const statement = 'INSERT INTO public.properties' + insertStatements[i];

            // Extract values using regex to parse the SQL
            const match = statement.match(/VALUES\s*\((.*?)\)(?:,|;)/s);
            if (!match) continue;

            const valuesStr = match[1];

            // Parse the values (this is a simplified parser)
            const values = parseValues(valuesStr);

            if (values) {
                const { data, error } = await supabase
                    .from('properties')
                    .insert([values]);

                if (error) {
                    console.error(`❌ Error inserting property: ${error.message}`);
                    errorCount++;
                } else {
                    console.log(`✅ Inserted: ${values.title}`);
                    successCount++;
                }
            }
        }

        console.log(`\n📊 Seeding complete!`);
        console.log(`   ✅ Success: ${successCount} properties`);
        console.log(`   ❌ Errors: ${errorCount} properties`);

    } catch (err) {
        console.error('Fatal error during seeding:', err);
        process.exit(1);
    }
};

// Helper function to parse SQL VALUES into object
function parseValues(valuesStr) {
    try {
        // This is a simplified parser - split by commas not in quotes/arrays
        const parts = [];
        let current = '';
        let inString = false;
        let inArray = false;
        let depth = 0;

        for (let i = 0; i < valuesStr.length; i++) {
            const char = valuesStr[i];

            if (char === "'" && valuesStr[i - 1] !== '\\') {
                inString = !inString;
                current += char;
            } else if (char === '{' && !inString) {
                inArray = true;
                depth++;
                current += char;
            } else if (char === '}' && !inString) {
                depth--;
                if (depth === 0) inArray = false;
                current += char;
            } else if (char === ',' && !inString && !inArray) {
                parts.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        if (current.trim()) parts.push(current.trim());

        // Map to object
        return {
            title: cleanValue(parts[0]),
            address: cleanValue(parts[1]),
            city: cleanValue(parts[2]),
            state: cleanValue(parts[3]),
            zip: cleanValue(parts[4]),
            price: parseFloat(parts[5]) || 0,
            bedrooms: parseFloat(parts[6]) || 0,
            bathrooms: parseFloat(parts[7]) || 0,
            sqft: parseFloat(parts[8]) || 0,
            lot_size: parseFloat(parts[9]) || 0,
            year_built: parseFloat(parts[10]) || 0,
            property_type: cleanValue(parts[11]),
            hoa_fees: parseFloat(parts[12]) || 0,
            days_on_market: parseFloat(parts[13]) || 0,
            status: cleanValue(parts[14]),
            description: cleanValue(parts[15]),
            images: parseArray(parts[16]),
            latitude: parseFloat(parts[17]) || 0,
            longitude: parseFloat(parts[18]) || 0,
            features: parseArray(parts[19])
        };
    } catch (err) {
        console.error('Error parsing values:', err);
        return null;
    }
}

function cleanValue(val) {
    if (!val) return null;
    val = val.trim();
    if (val === 'NULL' || val === '') return null;
    // Remove quotes
    if (val.startsWith("'") && val.endsWith("'")) {
        val = val.slice(1, -1);
    }
    // Unescape single quotes
    val = val.replace(/''/g, "'");
    return val;
}

function parseArray(val) {
    if (!val) return [];
    val = val.trim();
    if (val.startsWith('ARRAY[') && val.endsWith(']')) {
        val = val.slice(6, -1);
    }
    // Split by comma and clean each value
    return val.split(',').map(v => cleanValue(v)).filter(v => v);
}

runSeedSQL();
