import { EditorHelper } from ".";
import { FormValue } from "../types";

export class FormHelper {


  static initFormWithPrompt(prompt: string) {

    let objectWithEmptyValues = {}

    const extractedFormParameters = EditorHelper.parseText(prompt);
    // Create an object with keys from the array and initialize them with empty values
    if (extractedFormParameters) {
      objectWithEmptyValues = extractedFormParameters.reduce((result: Record<string, string>, key) => {
        result[key] = '';
        return result;
      }, {});
    }

    return objectWithEmptyValues;

  }


  static syncFormParameter(
    formInputs: FormValue,
    latestParameters: string[]
  ) {
    // Create a copy of the previous formInputs
    const updatedFormInputs: FormValue = { ...formInputs };

    // Update formInputs based on Object Keys
    Object.keys(updatedFormInputs).forEach((formParams) => {
      // If formInput Key is not in the Object Keys, remove it from formInputs
      if (!latestParameters.includes(formParams)) {
        delete updatedFormInputs[formParams];
      }
    });

    latestParameters.forEach((k) => {
      // If keyword is new and not in formInputs, add it with an empty string value
      if (!(k in updatedFormInputs)) {
        updatedFormInputs[k] = "";
      }
    });

    return updatedFormInputs;
  }
}
