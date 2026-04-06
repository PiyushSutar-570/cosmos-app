import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    socketId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },
    currentRoom: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for fast proximity queries (future scaling)
userSchema.index({ x: 1, y: 1 });

export default mongoose.model("User", userSchema);