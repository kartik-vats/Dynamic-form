import { UiSchema } from "@rjsf/utils";

export const formUI: UiSchema = {
    section1: {},
    section2: {
        events: {
            "ui:options": {
                addButtonText: "Add Event",
            },
        },
    },
    section3: {
        FICs: {
            "ui:options": {
                addButtonText: "Add FIC",
            },
        },
    },
    section4: {
        members: {
            "ui:options": {
                addButtonText: "Add Member",
            },
        },
    },
    section5: {
        socials: {
            "ui:options": {
                addButtonText: "Add Social Link",
            },
        },
    },
};