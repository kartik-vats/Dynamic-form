'use client';

import React from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import './global.css'; // Or the path to your global CSS file

// Schema and uiSchema for Club Data Form using RJSF

// Schema and uiSchema for Club Data Form using RJSF

// Schema and uiSchema for Club Data Form using RJSF

const schema: RJSFSchema = {
 
  type: 'object',
  properties: {
    section1: {
      type: 'object',
      title: 'Club Information',
      properties: {
        type: {
          type: 'string',
          title: 'Type',
          enum: ['Club', 'Technical Society']
        },
        name: {
          type: 'string',
          title: 'Club/Society Name',
          
       },
        about: { type: 'string', title: 'About the Club/Society' },
        bannerImage: { type: 'string', title: 'Banner Image (max 10MB)', format: 'data-url' },
        logo: { type: 'string', title: 'Logo (max 10MB)', format: 'data-url' },
        whyJoin: { type: 'string', title: 'Why Join the Club?' },
        howToJoin: { type: 'string', title: 'How Students Can Join?' },
        tagline: { type: 'string', title: 'Tagline (Optional)' },
        department: {
          type: 'string',
          title: 'Departments (Required for Technical Society)',
          
            enum: ['Civil', 'Computer', 'ECE', 'Electrical', 'Mechanical', 'PIE', 'Chemistry', 'Physics', 'Mathematics', 'Computer Application', 'Humanities and Social Sciences', 'Business Administration']
          ,
          uniqueItems: true
        }
      },
      dependencies: {
    type: {
      oneOf: [
        {
          properties: {
            type: { const: 'Club' },
            name: {
              enum: [
                'Fine Arts', 'Photog', 'MAD', 'HLAD', 'ELAD',
                'Students Activity Club', 'PG Club', 'Hiking and Trekking Club',
                'AVA', 'Spicmacay', 'MCC'
              ]
            }
          }
        },
        {
          properties: {
            type: { const: 'Technical Society' },
            name: {
              enum: [
                'Society of Automotive Engg (SAE)', 'AeroModelling Club',
                'Astronomy Club: Antariksh', 'Innovation & Incubation',
                'Electroreck', 'Embedded Systems & Robotic Control:EMR',
                'Infrastructure', 'Mechsoc', 'Microbus', 'Technobyte'
              ]
            }
          }
        }
      ]
    }
  }
},
    section2: {
      type: 'object',
      title: 'Events',
      properties: {
        events: {
          type: 'array',
          title: 'Events List',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              title: { type: 'string', title: 'Event Title' },
              description: { type: 'string', title: 'Event Description' },
              photos: {
                type: 'array',
                title: 'Event Photos (max 10)',
                maxItems: 10,
                items: { type: 'string', format: 'data-url' }
              }
            }
          }
        }
      }
    },
    section3: {
      type: 'object',
      title: 'Faculty Incharge',
      properties: {
        FICs: {
          type: 'array',
          title: 'Faculty Incharge Employee IDs',
          minItems: 1,
          items: { type: 'string' }
        }
      }
    },
    section4: {
      type: 'object',
      title: 'Club Members',
      properties: {
        members: {
          type: 'array',
          title: 'Members List',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              roll: { type: 'string', title: 'Roll Number' },
              position: {
                type: 'string',
                title: 'Position',
                enum: ['Secretary', 'President', 'Vice President', 'Joint Secretary', 'Member', 'Sponsorship Secretary']
              }
            }
          }
        }
      }
    },
    section5: {
      type: 'object',
      title: 'Club Socials',
      properties: {
        socials: {
          type: 'array',
          title: 'Social Media Links',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              platform: {
                type: 'string',
                title: 'Platform',
                enum: ['Instagram', 'Facebook', 'Twitter/X', 'Linkedin', 'YouTube', 'Others']
              },
              handle: { type: 'string', title: 'Platform ID (Username/Handle)' },
              link: { type: 'string', title: 'Profile/Page Link', format: 'uri' }
            }
          }
        }
      }
    },
    section6: {
      type: 'object',
      title: 'Additional Notes',
      properties: {
        notes: { type: 'string', title: 'Any other notes, suggestions, or queries from the FICs (Optional)' }
      }
    }
}
};

const uiSchema = {
    section1: {
   
  },
  section2: {
    events: {
      'ui:options': {
        addButtonText: 'Add Event'
      }
    }
  },
  section3: {
    FICs: {
      'ui:options': {
        addButtonText: 'Add FIC'
      }
    }
  },
  section4: {
    members: {
      'ui:options': {
        addButtonText: 'Add Member'
      }
    }
  },
  section5: {
    socials: {
      'ui:options': {
        addButtonText: 'Add Social Link'
      }
    }
  }
};

const handleSubmit = async ({ formData }: any) => {
  
  try {
    const res = await fetch('/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    alert(result.message || 'Submitted successfully!');
    console.log('Form submitted successfully:', result);
  } catch (err) {
    console.error('Submission failed:', err);
  }
};

const log = (type: string) => console.log.bind(console, type);

export default function Clubsdetails() {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Club's Details</h1>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onChange={log('changed')}
        onSubmit={handleSubmit}
        onError={log('errors')}
        formData={{ todos: [''] }} // Optional: one empty todo field to start
      />
    </div>
  );
}