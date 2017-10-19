
/**
 * formValidator - Validates the form fields
 */
class formValidator{

    /**
     * @description - Check whether field is valid or not
     * @param field - field to be validated
     * @return - true or false indicating whether field is valid
     */
    static isValidField(field) {
        const error = document.getElementById(`${field.name}Error`);
        if(error){
            error.textContent='';
        }

        if(!field.value){
            error.textContent = `${field.name} is required field`;
            return false;
        }
        return true
    }

    /**
     * @description - Check whether all input fields in form are valid or not
     * @return - true or false indicating whether form is valid
     */
    static isValidForm(){
        let isFormValid = true;
        const validateFields = document.querySelectorAll('input[type=text]');
        validateFields.forEach(field=> {
            const isValidField = this.isValidField(field);
            if(!isValidField){
                isFormValid = false;
            }
        })
        return isFormValid;
    }
}

export default formValidator;


