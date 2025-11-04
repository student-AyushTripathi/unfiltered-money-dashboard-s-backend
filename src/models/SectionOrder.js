


import mongoose from 'mongoose';

let SectionOrder;

try {
  const SectionOrderSchema = new mongoose.Schema(
    {
      pageId: {
        type: String,
        required: true,
        unique: true,
      },
      sections: [
        {
          id: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          order: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
  );

  SectionOrder = mongoose.model('SectionOrder', SectionOrderSchema);
  console.log('[Model] ✅ SectionOrder schema defined successfully.');
} catch (error) {
  console.error('[Model] ❌ Error defining SectionOrder schema:', {
    schema: 'SectionOrder',
    message: error.message,
    stack: error.stack,
    code: error.code,
  });
}

export default SectionOrder;
















