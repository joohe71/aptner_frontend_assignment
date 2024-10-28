import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core";

interface IPropsTextInput extends TextInputProps {
  children?: React.ReactNode;
  placeholder: string;
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  icon?: string | React.ReactNode;
  width?: string;
}

const TextInput = ({
  children,
  placeholder,
  value,
  onInputChange,
  disabled,
  icon,
  width,
  ...props
}: IPropsTextInput) => {
  return (
    <MantineTextInput
      placeholder={placeholder}
      label={null}
      value={value}
      onChange={onInputChange}
      radius={"0.75rem"}
      disabled={disabled}
      styles={theme => ({
        ...props.styles,
        root: {
          width: width ? width : "auto",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          input: {
            height: "auto",
            padding: "0.75rem",
            fontSize: theme.fontSizes.md,
            lineHeight: "1.5rem",
            fontStyle: "normal",
            fontWeight: 400,
            // default 테두리 값
            borderColor: theme.colors.gray[3],
            "&::placeholder": {
              color: theme.colors.gray[2],
            },
            // input 값이 존재 && 포커스 비활성화 시 테두리 값
            "&:not(:focus)": {
              borderColor: value ? theme.colors.gray[9] : theme.colors.gray[3],
            },
            "&:focus": {
              borderColor: theme.colors.gray[8],
            },
            "&:disabled": {
              backgroundColor: theme.colors.gray[2],
              borderColor: theme.colors.gray[3],
            },
            "&[data-invalid]": {
              borderColor: theme.colors.red[5],
              color: theme.colors.red[5],
            },
          },
        },
      })}
      icon={icon}
      {...props}
    >
      {children}
    </MantineTextInput>
  );
};

export default TextInput;
