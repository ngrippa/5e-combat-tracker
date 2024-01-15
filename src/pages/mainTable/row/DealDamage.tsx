/// <reference types="vite-plugin-svgr/client" />
import { useGlobalState } from "../../../state/State.tsx";
import { useMemo, useState } from "react";
import { ConcentrationCheck } from "./ConcentrationCheck.tsx";
import { useChar } from "../charContext.ts";
import { SingleExpandedField } from "../../../components/SingleExpandedField.tsx";
import DD from "../../../assets/sword.svg?react";
import { Box, SvgIcon, Typography } from "@mui/material";
import { clamp } from "lodash-es";
import { specialDamageEffects } from "../../../constants/specialDamageEffects.ts";
import { rollDieString } from "../../../dies/rollDieString.ts";
import { useSnackbar } from "notistack";

export const DealDamage = () => {
  const char = useChar();
  const { setCharacters } = useGlobalState();
  const { enqueueSnackbar } = useSnackbar();

  const [damage, setDamage] = useState<number>(0);

  const getHpColor = () => {
    if (char.currentHp <= 0) return "error.main";
    if (char.currentHp <= char.maxHp / 4) return "warning.main";
  };

  const effects = useMemo(
    () =>
      specialDamageEffects
        .map((effect) => ({
          effect,
          forChar: char.specialDamageEffects[effect].join(", "),
        }))
        .filter((e) => e.forChar),
    [char],
  );

  return (
    <>
      <Typography noWrap color={getHpColor()}>
        {char.currentHp} / {char.maxHp}
      </Typography>
      <SingleExpandedField
        title={`Deal damage to ${char.name}`}
        success={(value) =>
          setCharacters((d) => {
            let dmg = +value;
            if (isNaN(dmg)) {
              dmg = rollDieString(value);
              enqueueSnackbar(`Rolled ${dmg} damage`, { variant: "info" });
            }
            const c = d[char.id];
            const newHp = c.currentHp - +dmg;
            c.currentHp = clamp(newHp, 0, c.maxHp);
            if (char.concentrated && dmg > 0) setDamage(dmg);
          })
        }
        inputProps={{ label: "Deal Damage" }}
        icon={
          <SvgIcon>
            <DD />
          </SvgIcon>
        }
      >
        <Box mb={2}>
          {effects.map(({ effect, forChar }) => (
            <Typography color="warning.main" key={effect}>
              {effect}: {forChar}
            </Typography>
          ))}
        </Box>
      </SingleExpandedField>
      <ConcentrationCheck setDamage={setDamage} damage={damage} />
    </>
  );
};
