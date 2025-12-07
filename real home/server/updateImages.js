require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Professional property images from Unsplash
const propertyImages = {
    luxury: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop&q=80'
    ],
    modern: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop&q=80'
    ],
    traditional: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&q=80'
    ],
    condo: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop&q=80'
    ],
    beach: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80'
    ],
    urban: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&h=800&fit=crop&q=80'
    ]
};

const updateImages = async () => {
    console.log('🖼️  Updating property images with professional photos...\n');

    try {
        // Get all properties
        const { data: properties, error: fetchError } = await supabase
            .from('properties')
            .select('id, title, property_type, city');

        if (fetchError) {
            console.error('Error fetching properties:', fetchError);
            return;
        }

        console.log(`Found ${properties.length} properties to update\n`);

        let successCount = 0;
        let errorCount = 0;

        for (const property of properties) {
            // Determine image category based on property type and location
            let imageCategory = 'modern';

            if (property.property_type === 'Condo') {
                imageCategory = 'condo';
            } else if (property.city.includes('Beach') || property.city.includes('Miami') || property.city.includes('Santa Monica')) {
                imageCategory = 'beach';
            } else if (property.title.includes('Luxury') || property.title.includes('Estate') || property.title.includes('Penthouse')) {
                imageCategory = 'luxury';
            } else if (property.title.includes('Victorian') || property.title.includes('Brownstone') || property.title.includes('Historic')) {
                imageCategory = 'traditional';
            } else if (property.city.includes('New York') || property.city.includes('Chicago') || property.city.includes('San Francisco')) {
                imageCategory = 'urban';
            }

            const images = propertyImages[imageCategory];

            // Update property with new images
            const { error: updateError } = await supabase
                .from('properties')
                .update({ images: images })
                .eq('id', property.id);

            if (updateError) {
                console.error(`❌ Error updating ${property.title}:`, updateError.message);
                errorCount++;
            } else {
                console.log(`✅ Updated: ${property.title} (${imageCategory})`);
                successCount++;
            }
        }

        console.log(`\n📊 Image update complete!`);
        console.log(`   ✅ Success: ${successCount} properties`);
        console.log(`   ❌ Errors: ${errorCount} properties`);

    } catch (err) {
        console.error('Fatal error during image update:', err);
        process.exit(1);
    }
};

updateImages();
