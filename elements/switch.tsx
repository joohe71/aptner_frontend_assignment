import { theme } from "@/styles/theme";
import { Switch as MantineSwitch } from "@mantine/core";

interface IPropsSwitch {
  checked: boolean;
  onSwitchChange: () => void;
  onLabel: React.ReactNode;
  offLabel: React.ReactNode;
}

const Switch = ({ checked, onSwitchChange, onLabel, offLabel }: IPropsSwitch) => {
  return (
    <MantineSwitch
      checked={checked}
      onChange={onSwitchChange}
      onLabel={onLabel}
      offLabel={offLabel}
      size="xl"
      styles={{
        root: {
          "input:checked+.mantine-5aki0d": {
            backgroundColor: theme.colors.primary[2],
            border: theme.colors.primary[2],
          },
        },
      }}
    />
  );
};

export default Switch;
