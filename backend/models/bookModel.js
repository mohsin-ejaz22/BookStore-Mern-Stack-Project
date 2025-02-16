import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true, // Ensure title is unique in the database
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model("Book", bookSchema);
