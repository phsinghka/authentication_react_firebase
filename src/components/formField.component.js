const FormField = ({ label, ...inputProps }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  );
};

export default FormField;
