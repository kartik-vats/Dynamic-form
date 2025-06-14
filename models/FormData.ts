import mongoose from 'mongoose';

const FormDataSchema = new mongoose.Schema({}, { strict: false }); // Accept all fields

export default mongoose.models.FormData || mongoose.model('FormData', FormDataSchema);
