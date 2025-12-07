
const supabase = require('../supabaseClient');

// In-memory fallback
const tours = [];

exports.createTour = async (req, res) => {
    const { propertyId, name, email, phone, message, date } = req.body;

    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('tours')
                .insert([{ property_id: propertyId, name, email, phone, message, tour_date: date }])
                .select()
                .single();

            if (error) throw error;
            return res.status(201).json({ message: 'Tour scheduled successfully', tour: data });
        } catch (err) {
            console.error('Supabase error (falling back to mock):', err.message);
        }
    }

    // Fallback
    const newTour = {
        id: String(tours.length + 1),
        propertyId,
        name,
        email,
        phone,
        message,
        date,
        createdAt: new Date()
    };
    tours.push(newTour);
    res.status(201).json({ message: 'Tour scheduled successfully (mock)', tour: newTour });
};

exports.getTours = async (req, res) => {
    // Admin only or user specific? For now, just return all for demo
    if (supabase) {
        try {
            const { data, error } = await supabase.from('tours').select('*');
            if (error) throw error;
            return res.json(data);
        } catch (err) {
            console.error('Supabase error:', err.message);
        }
    }
    res.json(tours);
};
