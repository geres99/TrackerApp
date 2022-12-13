import { IconPlay, IconStop } from "assets/svg";
import Box from "components/Box";
import CompanyStatus, { CompanyStatusType } from "components/CompanyStatus";
import Typography from "components/Typography";
import { FC } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { removeStorage, setStorage } from "utils/asyncStorage";
import { colors } from "theme/colors";

export type HeaderType = {
  item?: CompanyStatusType;
  time?: number;
  updateTime?: () => void;
};

const Header: FC<HeaderType> = ({ item, time, updateTime }) => {
  const [isActive, setIsActive] = useState(true);
  const { top } = useSafeAreaInsets();

  const minutes = useMemo(() => (time ? Math.floor(time / 60) : 0), [time]);
  const seconds = useMemo(() => (time ? time - minutes * 60 : 0), [time]);

  useEffect(() => {
    if (isActive && updateTime) {
      const interval = setInterval(() => {
        setStorage(
          "activeItem",
          JSON.stringify({ ...item, time, timeNow: new Date().getTime() })
        );
        updateTime();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
    removeStorage("activeItem");
  }, [updateTime, isActive, time]);

  return (
    <Box
      pt={top}
      px={16}
      bg='light'
      flexDirection='row'
      alignItems='center'
      height={top + 64}
    >
      <CompanyStatus {...item} />
      {item ? (
        <Box flexDirection='row' alignItems='center'>
          <Typography variant='h5'>
            {minutes >= 10 ? minutes : `0${minutes}`}:
            {seconds >= 10 ? seconds : `0${seconds}`} min
          </Typography>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsActive((prev) => !prev)}
          >
            <Box
              ml={8}
              height={32}
              width={32}
              br={16}
              bg={isActive ? "error" : "success"}
              justifyContent='center'
              alignItems='center'
              flexDirection='row'
            >
              <Box ml={!isActive ? 2 : undefined} />
              {isActive ? (
                <IconStop height={16} width={16} fill={colors.light} />
              ) : (
                <IconPlay height={20} width={20} fill={colors.light} />
              )}
            </Box>
          </TouchableOpacity>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
