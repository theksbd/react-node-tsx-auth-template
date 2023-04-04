interface Props {
  name: string;
  placeholder: string;
  type: string;
  label: string;
  required?: boolean;
}

const FormInput = (props: Props) => {
  const { label, ...otherProps } = props;

  return (
    <div className='form-item'>
      <label className='form-label'>{label}</label>
      <input {...otherProps} />
    </div>
  );
};

export default FormInput;
