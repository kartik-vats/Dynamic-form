import { RJSFSchema } from "@rjsf/utils";

// Schema and uiSchema for Club Data Form using RJSF
export const ClubsSchema: RJSFSchema = {
	type: "object",
	properties: {
		section1: {
			type: "object",
			title: "Club Information",
			required: [
				"type",
				"name",
				"about",
				"bannerImage",
				"logo",
				"whyJoin",
				"howToJoin",
				// 'department' is conditionally required for Technical Society
			],
			properties: {
				type: {
					type: "string",
					title: "Type",
					enum: ["Club", "Technical Society"],
				},
				name: {
					type: "string",
					title: "Club/Society Name",
				},
				about: { type: "string", title: "About the Club/Society" },
				bannerImage: {
					type: "string",
					title: "Banner Image (max 10MB)",
					format: "data-url",
				},
				logo: { type: "string", title: "Logo (max 10MB)", format: "data-url" },
				whyJoin: { type: "string", title: "Why Join the Club?" },
				howToJoin: { type: "string", title: "How Students Can Join?" },
				tagline: { type: "string", title: "Tagline (Optional)" },
				department: {
					type: "string",
					title: "Departments (Required for Technical Society)",
					enum: [
						"Civil",
						"Computer",
						"ECE",
						"Electrical",
						"Mechanical",
						"PIE",
						"Chemistry",
						"Physics",
						"Mathematics",
						"Computer Application",
						"Humanities and Social Sciences",
						"Business Administration",
					],
					uniqueItems: true,
				},
			},
			dependencies: {
				type: {
					oneOf: [
						{
							properties: {
								type: { const: "Club" },
								name: {
									enum: [
										"Fine Arts",
										"Photog",
										"MAD",
										"HLAD",
										"ELAD",
										"Students Activity Club",
										"PG Club",
										"Hiking and Trekking Club",
										"AVA",
										"Spicmacay",
										"MCC",
									],
								},
							},
							required: ["name"],
						},
						{
							properties: {
								type: { const: "Technical Society" },
								name: {
									enum: [
										"Society of Automotive Engg (SAE)",
										"AeroModelling Club",
										"Astronomy Club: Antariksh",
										"Innovation & Incubation",
										"Electroreck",
										"Embedded Systems & Robotic Control:EMR",
										"Infrastructure",
										"Mechsoc",
										"Microbus",
										"Technobyte",
									],
								},
								department: {
									type: "string",
									title: "Departments (Required for Technical Society)",
									enum: [
										"Civil",
										"Computer",
										"ECE",
										"Electrical",
										"Mechanical",
										"PIE",
										"Chemistry",
										"Physics",
										"Mathematics",
										"Computer Application",
										"Humanities and Social Sciences",
										"Business Administration",
									],
									uniqueItems: true,
								},
							},
							required: ["name", "department"],
						},
					],
				},
			},
		},

		section2: {
			type: "object",
			title: "Events",
			required: ["events"],
			properties: {
				events: {
					type: "array",
					title: "Events List",
					minItems: 1,
					items: {
						type: "object",
						required: ["title", "description"], // 📌 You may choose if 'photos' is required
						properties: {
							title: { type: "string", title: "Event Title" },
							description: { type: "string", title: "Event Description" },
							photos: {
								type: "array",
								title: "Event Photos (max 10)",
								maxItems: 10,
								items: { type: "string", format: "data-url" },
							},
						},
					},
				},
			},
		},

		section3: {
			type: "object",
			title: "Faculty Incharge",
			required: ["FICs"],
			properties: {
				FICs: {
					type: "array",
					title: "Faculty Incharge Employee IDs",
					minItems: 1,
					items: { type: "string" },
				},
			},
		},

		section4: {
			type: "object",
			title: "Club Members",
			required: ["members"],
			properties: {
				members: {
					type: "array",
					title: "Members List",
					minItems: 1,
					items: {
						type: "object",
						required: ["roll", "position"],
						properties: {
							roll: { type: "string", title: "Roll Number" },
							position: {
								type: "string",
								title: "Position",
								enum: [
									"Secretary",
									"President",
									"Vice President",
									"Joint Secretary",
									"Member",
									"Sponsorship Secretary",
								],
							},
						},
					},
				},
			},
		},

		section5: {
			type: "object",
			title: "Club Socials",
			required: ["socials"],
			properties: {
				socials: {
					type: "array",
					title: "Social Media Links",
					minItems: 1,
					items: {
						type: "object",
						required: ["platform", "handle", "link"],
						properties: {
							platform: {
								type: "string",
								title: "Platform",
								enum: [
									"Instagram",
									"Facebook",
									"Twitter/X",
									"Linkedin",
									"YouTube",
									"Others",
								],
							},
							handle: {
								type: "string",
								title: "Platform ID (Username/Handle)",
							},
							link: {
								type: "string",
								title: "Profile/Page Link",
								format: "uri",
							},
						},
					},
				},
			},
		},

		section6: {
			type: "object",
			title: "Additional Notes",
			properties: {
				notes: {
					type: "string",
					title:
						"Any other notes, suggestions, or queries from the FICs (Optional)",
				},
			},
		},
	},
};