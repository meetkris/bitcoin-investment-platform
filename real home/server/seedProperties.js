require('dotenv').config();
const supabase = require('./supabaseClient');
const properties = require('./models/Property');

const seedProperties = async () => {
    console.log('Starting seed process...');

    if (!supabase) {
        console.error('Supabase client not initialized. Check your credentials.');
        process.exit(1);
    }

    // Map camelCase to snake_case for SQL compatibility
    const propertiesToInsert = properties.map(p => {
        // Exclude ID to let DB handle it? Or try to keep it? 
        // If DB id is UUID, '1' will fail. If int, '1' is fine.
        // Let's exclude ID and let DB generate it to be safe.
        const { id, ...rest } = p;

        return {
            title: p.title,
            address: p.address,
            city: p.city,
            state: p.state,
            zip: p.zip,
            price: p.price,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            sqft: p.sqft,
            lot_size: p.lotSize,
            year_built: p.yearBuilt,
            property_type: p.propertyType,
            hoa_fees: p.hoaFees,
            days_on_market: p.daysOnMarket,
            status: p.status,
            description: p.description,
            images: p.images,
            latitude: p.latitude,
            longitude: p.longitude,
            features: p.features
        };
    });

    try {
        // First check if data exists to avoid duplicates
        const { data: existing, error: checkError } = await supabase
            .from('properties')
            .select('id')
            .limit(1);

        if (checkError) {
            // If table doesn't exist or other error
            console.error('Error checking existing properties:', checkError.message);
            // If error is code 42P01 (undefined table), we can't do anything.
            // But let's assume table exists as per user request.
        }

        if (existing && existing.length > 0) {
            console.log('Properties table already has data. Skipping seed.');
            process.exit(0);
        }

        console.log(`Inserting ${propertiesToInsert.length} properties...`);

        const { data, error } = await supabase
            .from('properties')
            .insert(propertiesToInsert)
            .select();

        if (error) {
            console.error('Error inserting properties:', error.message);
            // Fallback: try inserting with camelCase if snake_case failed? 
            // Only if error message suggests column not found.
        } else {
            console.log('Successfully inserted properties:', data.length);
        }

    } catch (err) {
        console.error('Unexpected error during seeding:', err);
    }
};

seedProperties();
