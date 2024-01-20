import { model, Schema, Types } from 'mongoose';

const listingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    furnished: {
        type: Boolean,
        default: true
    },
    parking: {
        type: Boolean,
        default: false
    },
    offer: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

const listingModel = model('Listing', listingSchema)

export default listingModel