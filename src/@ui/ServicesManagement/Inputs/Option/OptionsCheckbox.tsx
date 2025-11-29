type Props = {
  isChecked: boolean;
  onChangeCheckbox: () => void;
};

const OptionsCheckbox = ({ isChecked, onChangeCheckbox }: Props) => {
  return (
    <label>
      <input
        type="checkbox"
        name="options"
        checked={isChecked}
        onChange={onChangeCheckbox}
      />
      <span className="checkmark peer-checked::after:size-3"></span>
      Wieloopcyjna usługa
    </label>
  );
};

export default OptionsCheckbox;
