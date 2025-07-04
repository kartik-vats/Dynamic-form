"use client";

import React from "react";

// Third-party imports
import { withTheme, FormProps } from "@rjsf/core";
import { Theme as Bootstrap4Theme } from "@rjsf/bootstrap-4";
import validator from "@rjsf/validator-ajv8";
import { ArrayFieldTemplateProps, RJSFSchema, UiSchema } from "@rjsf/utils";

// Styles
import "./global.css";

// Local imports
import { ClubsSchema } from "./forms/schema";
import { formUI } from "./forms/uiSchema";

const Form = withTheme<{}, RJSFSchema, {}>(Bootstrap4Theme);

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
				<button
					className="btn btn-primary"
					onClick={props.onAddClick}
					type="button"
				>
					{typeof props.uiSchema?.["ui:options"]?.addButtonText === "string"
						? props.uiSchema["ui:options"].addButtonText
						: "Add Item"}
				</button>
			)}
		</div>
	);
};
const handleSubmit = async ({ formData }: any) => {
	try {
		const res = await fetch("/api/form", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const result = await res.json();
		alert(result.message || "Submitted successfully!");
		console.log("Form submitted successfully:", result);
	} catch (err) {
		console.error("Submission failed:", err);
	}
};

const log = (type: string) => console.log.bind(console, type);

export default function Clubsdetails() {
	return (
		<div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
			<h1>Club's Details</h1>
			<Form
				schema={ClubsSchema}
				uiSchema={formUI}
				validator={validator}
				templates={{ ArrayFieldTemplate: CustomArrayFieldTemplate }}
				onChange={log("changed")}
				onSubmit={handleSubmit}
				onError={log("errors")}
			/>
		</div>
	);
}
