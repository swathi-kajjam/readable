
class formValidator{

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


