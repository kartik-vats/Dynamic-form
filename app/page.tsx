'use client';
import React from 'react';
import { withTheme, FormProps } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import validator from '@rjsf/validator-ajv8';
import { ArrayFieldTemplateProps, RJSFSchema, UiSchema } from '@rjsf/utils';
import './global.css';

// ✅ Properly typed form component
const Form = withTheme<{}, RJSFSchema, {}>(Bootstrap4Theme);

// Schema and uiSchema for Club Data Form using RJSF

// Schema and uiSchema for Club Data Form using RJSF

// Schema and uiSchema for Club Data Form using RJSF

const schema: RJSFSchema = {
  type: 'object',
  properties: {
    section1: {
      type: 'object',
      title: 'Club Information',
      required: [
        'type',
        'name',
        'about',
        'bannerImage',
        'logo',
        'whyJoin',
        'howToJoin'
        // 'department' is conditionally required for Technical Society
      ],
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
          enum: [
            'Civil', 'Computer', 'ECE', 'Electrical', 'Mechanical', 'PIE',
            'Chemistry', 'Physics', 'Mathematics', 'Computer Application',
            'Humanities and Social Sciences', 'Business Administration'
          ],
          uniqueItems: true
        }
      },
      dependencies: {
        type: {
          oneOf: [
            {
              properties: {
                type: { const: 'Club'  },
                name: {
                  enum: [
                    'Fine Arts', 'Photog', 'MAD', 'HLAD', 'ELAD',
                    'Students Activity Club', 'PG Club', 'Hiking and Trekking Club',
                    'AVA', 'Spicmacay', 'MCC'
                  ]
                }
              },
              required: ['name']
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
                },
                department: {
                  type: 'string',
                  title: 'Departments (Required for Technical Society)',
                  enum: [
                    'Civil', 'Computer', 'ECE', 'Electrical', 'Mechanical', 'PIE',
                    'Chemistry', 'Physics', 'Mathematics', 'Computer Application',
                    'Humanities and Social Sciences', 'Business Administration'
                  ],
                  uniqueItems: true
                }
              },
              required: ['name', 'department']
            }
          ]
        }
      }
    },

    section2: {
      type: 'object',
      title: 'Events',
      required: ['events'],
      properties: {
        events: {
          type: 'array',
          title: 'Events List',
          minItems: 1,
          items: {
            type: 'object',
            required: ['title', 'description'], // 📌 You may choose if 'photos' is required
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
      required: ['FICs'],
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
      required: ['members'],
      properties: {
        members: {
          type: 'array',
          title: 'Members List',
          minItems: 1,
          items: {
            type: 'object',
            required: ['roll', 'position'],
            properties: {
              roll: { type: 'string', title: 'Roll Number' },
              position: {
                type: 'string',
                title: 'Position',
                enum: [
                  'Secretary', 'President', 'Vice President',
                  'Joint Secretary', 'Member', 'Sponsorship Secretary'
                ]
              }
            }
          }
        }
      }
    },

    section5: {
      type: 'object',
      title: 'Club Socials',
      required: ['socials'],
      properties: {
        socials: {
          type: 'array',
          title: 'Social Media Links',
          minItems: 1,
          items: {
            type: 'object',
            required: ['platform', 'handle', 'link'],
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
        notes: {
          type: 'string',
          title: 'Any other notes, suggestions, or queries from the FICs (Optional)'
        }
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
const CustomArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  return (
    <div>
      {props.items.map((element) => (
        <div key={element.index} className="mb-3">
          <div>{element.children}</div>
          {element.hasRemove && (
            <button
              className="btn btn-danger"
              onClick={element.onDropIndexClick(element.index)}
              type="button"
            >
              Remove
            </button>
          )}
          <hr />
        </div>
      ))}
      {props.canAdd && (
        <button className="btn btn-primary" onClick={props.onAddClick} type="button">
          {typeof props.uiSchema?.['ui:options']?.addButtonText === 'string'
            ? props.uiSchema['ui:options'].addButtonText
            : 'Add Item'}
        </button>
      )}
    </div>
  );
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
  templates={{ ArrayFieldTemplate: CustomArrayFieldTemplate }}
  onChange={log('changed')}
  onSubmit={handleSubmit}
  onError={log('errors')}
/>
    </div>
  );
}