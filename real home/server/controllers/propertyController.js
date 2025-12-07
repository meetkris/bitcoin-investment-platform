const properties = require('../models/Property');
const supabase = require('../supabaseClient');

exports.getAllProperties = async (req, res) => {
    const { city, minPrice, maxPrice } = req.query;

    if (supabase) {
        try {
            let query = supabase.from('properties').select('*');

            if (city) query = query.ilike('city', `%${city}%`);
            if (minPrice) query = query.gte('price', minPrice);
            if (maxPrice) query = query.lte('price', maxPrice);

            const { data, error } = await query;
            if (error) throw error;

            // If no data found in DB, maybe fallback to mock? 
            // For now, let's return DB data if connection works.
            if (data && data.length > 0) return res.json(data);
        } catch (err) {
            console.error('Supabase error (falling back to mock):', err.message);
        }
    }

    // Fallback to mock data
    let result = properties;

    if (city) {
        result = result.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (minPrice) {
        result = result.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
        result = result.filter(p => p.price <= parseInt(maxPrice));
    }

    res.json(result);
};

exports.getPropertyById = async (req, res) => {
    const { id } = req.params;

    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('id', id)
                .single();

            if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
            if (data) return res.json(data);
        } catch (err) {
            console.error('Supabase error (falling back to mock):', err.message);
        }
    }

    const property = properties.find(p => p.id === id);
    if (property) {
        res.json(property);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

exports.createProperty = async (req, res) => {
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('properties')
                .insert([req.body])
                .select()
                .single();

            if (error) throw error;
            return res.status(201).json(data);
        } catch (err) {
            console.error('Supabase error (falling back to mock):', err.message);
            return res.status(500).json({ message: 'Failed to create property in DB', error: err.message });
        }
    }

    const newProperty = {
        id: String(properties.length + 1),
        ...req.body
    };
    properties.push(newProperty);
    res.status(201).json(newProperty);
};
