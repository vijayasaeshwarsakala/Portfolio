const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['AI / ML', 'Programming', 'Web Development', 'Data Science', 'Databases', 'Tools', 'Soft Skills']
  },
  proficiency: { type: Number, min: 0, max: 100, default: 80 },
  icon: { type: String, default: "" },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
