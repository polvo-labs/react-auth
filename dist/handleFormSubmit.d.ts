export default function handleFormSubmit(options: handleFormSubmitOptions): Promise<any>;
interface handleFormSubmitOptions {
    request: Promise<any>;
    onValidationErrors(validationErrors: any): any;
    onSuccess(data: any): any;
    onFailure(err: any): any;
}
export {};
