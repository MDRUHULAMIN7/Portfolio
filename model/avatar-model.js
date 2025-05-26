import mongoose  from "mongoose";

const avatarSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
  },
  updatedDate: {
    type: String,
    required: false,
  },
   title1: {
    type: String,
    required: true,
  },
   title2: {
    type: String,
    required: true,
  },
    desForHome: {
    type: String,
    required: true,
  },
    desForSidebar: {
    type: String,
    required: true,
  },
    jobRoles: {
    type: Array,
    required: true,
  },
  resume:{
    type:String,
    require:true,
  },
});

export const Avatar = mongoose?.models?.Avatar || mongoose?.model("Avatar", avatarSchema);
