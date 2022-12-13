import { IconPlus } from "assets/svg";
import Box from "components/Box";
import CompanyStatus, { CompanyStatusType } from "components/CompanyStatus";
import Header from "components/Header";
import Typography from "components/Typography";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getStorage } from "utils/asyncStorage";
import { colors } from "theme/colors";

export type itemDataType = CompanyStatusType & { time: number; key: number };

const SECOND_IN_SEC = 1;
const MINUTE_IN_SEC = 60;
const HOUR_IN_SEC = MINUTE_IN_SEC * 60;

export default function App() {
  const [itemsData, setItemsData] = useState<itemDataType[]>([
    {
      title: "Planning",
      color: "success",
      label: "Kiwi & Co",
      description: "Agency",
      time: 1000,
      key: 1,
    },
    {
      title: "Scheduling",
      color: "error",
      label: "Mango",
      description: "Saas",
      time: 1200,
      key: 2,
    },
    {
      title: "Evalation",
      color: "info",
      label: "UX Review",
      description: "Testing Labs",
      time: 1400,
      key: 3,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<{
    item: CompanyStatusType;
    index: number;
  }>();

  const updateItemTimer = useCallback((index: number) => {
    setItemsData((prev) => {
      const mutatedData = [...prev];
      if (mutatedData[index]) {
        mutatedData[index].time++;
      }

      return mutatedData;
    });
  }, []);

  const getCorrectNumber = useCallback((number: number) => {
    return number >= 10 ? number : `0${number}`;
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      const storageItem = await getStorage("activeItem");
      const parsedItem = storageItem ? JSON.parse(storageItem) : "";
      if (parsedItem) {
        const storageIndex = itemsData.findIndex(
          ({ key }) => key === Number(parsedItem.key)
        );
        if (storageIndex !== -1) {
          setItemsData((prev) => {
            const mutatedData = [...prev];
            mutatedData[storageIndex].time = Math.ceil(
              (new Date().getTime() - parsedItem.timeNow) / 1000 +
                parsedItem.time
            );
            return mutatedData;
          });
        } else {
          setItemsData((prev) => [
            ...prev,
            {
              title: parsedItem.title,
              color: parsedItem.color,
              label: parsedItem.label,
              description: parsedItem.description,
              time: Math.ceil(
                (new Date().getTime() - parsedItem.timeNow) / 1000 +
                  parsedItem.time
              ),
              key: itemsData.length + 1,
            },
          ]);
        }
        setSelectedItem({
          item: {
            title: parsedItem.title,
            color: parsedItem.color,
            label: parsedItem.label,
            description: parsedItem.description,
          },
          index: storageIndex !== -1 ? storageIndex : itemsData.length,
        });
      }
    };
    getInfo();
  }, []);

  return (
    <SafeAreaProvider>
      <Header
        item={selectedItem?.item}
        updateTime={
          typeof selectedItem?.index === "number"
            ? () => updateItemTimer(selectedItem?.index)
            : undefined
        }
        time={
          typeof selectedItem?.index === "number"
            ? itemsData[selectedItem?.index]?.time
            : undefined
        }
      />
      <KeyboardAwareScrollView
        style={{ flexGrow: 1, backgroundColor: colors.muted }}
      >
        <Box flexGrow={1} bg='muted'>
          <Box m={12} py={12} bg='light' br={8}>
            {itemsData.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedItem({ item, index })}
                key={item.key}
              >
                <Box
                  flexGrow={1}
                  flexDirection='row'
                  pl={12}
                  pr={40}
                  alignItems='center'
                >
                  <CompanyStatus {...item} />
                  <Typography>
                    {getCorrectNumber(Math.floor(item.time / HOUR_IN_SEC))}:
                    {getCorrectNumber(
                      Math.floor((item.time % HOUR_IN_SEC) / MINUTE_IN_SEC)
                    )}
                    :
                    {getCorrectNumber(
                      Math.floor((item.time % MINUTE_IN_SEC) / SECOND_IN_SEC)
                    )}
                  </Typography>
                </Box>
                {index !== itemsData.length - 1 ? (
                  <Box height={1} width='100%' bg='muted' my={12} />
                ) : null}
              </TouchableOpacity>
            ))}
          </Box>
        </Box>
        <Box px={12} flexDirection='row' pb={16} alignItems='center'>
          <TextInput
            style={{
              backgroundColor: colors.light,
              padding: 12,
              borderRadius: 16,
              flexGrow: 1,
            }}
            value={inputValue}
            onChangeText={(value) => setInputValue(value)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              setItemsData((prev) => [
                ...prev,
                {
                  title: inputValue,
                  color: "info",
                  label: "UX Review",
                  description: "Testing Labs",
                  time: 0,
                  key: itemsData.length + 1,
                },
              ])
            }
          >
            <Box
              width={32}
              height={32}
              br={16}
              bg='success'
              justifyContent='center'
              alignItems='center'
              ml={8}
            >
              <IconPlus fill={colors.light} height={16} width={16} />
            </Box>
          </TouchableOpacity>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
}
