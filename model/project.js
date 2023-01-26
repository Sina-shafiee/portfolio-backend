const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: {
      trim: true,
      lowercase: true,
      type: String,
      required: [true, 'Please provide a title']
    },
    bio: {
      trim: true,
      type: String,
      required: [true, 'Please provide a bio']
    },
    desc: {
      trim: true,
      type: String,
      required: [true, 'Please provide a description']
    },
    technologies: {
      type: [String],
      required: [true, 'Please provide technologies']
    },
    isCompleted: {
      type: Boolean,
      default: true
    },
    tags: {
      type: [
        {
          type: String,
          trim: true,
          enum: {
            values: ['popular', 'upcoming'],
            message: '{VALUE} is not supported'
          }
        }
      ]
    },
    image: {
      img_id: {
        type: String,
        required: [true, 'Please provide img_id']
      },
      img_url: {
        type: String,
        required: [true, 'Please provide img_url']
      }
    },
    links: {
      github: {
        type: String,
        required: [true, 'Please provide repository link']
      },
      website: {
        type: String,
        required: [true, 'Please provide website link']
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', projectSchema);
