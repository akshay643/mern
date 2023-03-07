import mongoose from "mongoose";

  const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    file: {
      data: Buffer,
      contentType: String
    },
    date: { type: Date, default: Date.now },
    candidateId: { type: mongoose.Schema.Types.ObjectId, required: true,ref:'Candidates' },

  });

  const Documents = mongoose.model('Documents', documentSchema)

  export default Documents