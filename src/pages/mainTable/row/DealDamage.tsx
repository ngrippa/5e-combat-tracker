/// <reference types="vite-plugin-svgr/client" />
import { useGlobalState } from "../../../state/State.tsx";
import { useState } from "react";
import { ConcentrationCheck } from "./ConcentrationCheck.tsx";
import { useChar } from "../charContext.ts";
import { SingleExpandedField } from "../../../components/SingleExpandedField.tsx";
import DD from "../../../assets/sword.svg?react";
import { SvgIcon, Typography } from "@mui/material";

export const DealDamage = () => {
  const char = useChar();
  const { setCharacters } = useGlobalState();

  const [damage, setDamage] = useState<number>(0);

  return (
    <>
      <Typography noWrap>
        {char.currentHp} / {char.maxHp}
      </Typography>
      <SingleExpandedField
        title={`Deal damage to ${char.name}`}
        success={(value) =>
          setCharacters((d) => {
            const dmg = +value;
            const c = d[char.id];
            c.currentHp -= +dmg;
            if (char.concentrated) setDamage(dmg);
          })
        }
        inputProps={{ label: "Deal Damage" }}
        icon={
          <SvgIcon>
            <DD />
          </SvgIcon>
        }
      />
      <ConcentrationCheck setDamage={setDamage} damage={damage} />
    </>
  );
};
