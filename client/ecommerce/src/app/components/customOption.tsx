import { OptionProps} from 'react-select';

type OptionType = {
  value: string;
  label: string;
};


export const CustomOption = (props: OptionProps<OptionType, false>) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100">
      <div
        style={{
          background: data.value,
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <span>{data.label}</span>
    </div>
  );
};

