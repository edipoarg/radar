import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./Landing.module.css";
import AttackDetail from "./AttackDetail/AttackDetail";
import FiltersByType from "./Filters/ByType/FiltersByType";
import MonthsSlider from "./MonthsSlider/MonthsSlider";
import { RadarMap } from "./Map/Map";
import type { AttacksData, Attack } from "../../../common/json-shape";
import { useFilters } from "../../helpers/useFilters";
import jsonToCsvExport from "json-to-csv-export";
import { ReportPopupContent } from "../ReportPopupContent/ReportPopupContent";
import ReactPopup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Drawer } from "./Drawer/Drawer";
import { useTogglable } from "../../helpers/useTogglable";
import { MOBILE_NAVBAR_CONSTANTS } from "../../navbar-absolute-distance-constants";
import { GoDownload } from "react-icons/go";
import { NumberOfAttacks } from "./NumberOfAttacks/NumberOfAttacks";

type LoaderData = {
  urls: {
    provincias: unknown;
    departamentosBsAs: unknown;
    rutas: unknown;
    ataques: AttacksData;
  };
};

const makeAttackSerializable = (attack: Attack) => ({
  ...attack,
  coords: `${attack.coords.latitude}, ${attack.coords.longitude}`,
});

const onDownloadDataRequest =
  (serializableFilteredAttacks: ReturnType<typeof makeAttackSerializable>[]) =>
  () => {
    jsonToCsvExport({ data: serializableFilteredAttacks });
  };

function Landing() {
  const { urls } = useLoaderData() as LoaderData;
  const { provincias, departamentosBsAs, rutas, ataques } = urls;
  const { colorByAttackType } = ataques;
  /** Boundary dates are the earliest date that an attack can be from
   * and the latest date that an attack can be from in order to be shown on the map.
   */
  const boundaryDates = useMemo(
    () => ({
      min: new Date(ataques.min),
      max: new Date(ataques.max),
    }),
    [ataques.min, ataques.max],
  );

  const [selectedAttacks, setSelectedAttacks] = useState<Attack[]>([]);
  const removeAttackFromSelectedAttacks = (attackId: number) => {
    setSelectedAttacks(selectedAttacks.filter((att) => att.id !== attackId));
  };

  const { filteredData, setDates, setTipoFilters, tipoFilters } =
    useFilters(ataques);

  const serializableFilteredAttacks = filteredData.map(makeAttackSerializable);
  const [drawerIsOpen, toggleDrawerIsOpen] = useTogglable();

  return (
    <article className={styles.Landing}>
      <RadarMap
        setSelectedAttack={(newAttack) =>
          setSelectedAttacks([...selectedAttacks, newAttack])
        }
        sourceData={{
          departamentosBsAs,
          provincias,
          rutas,
        }}
        attacksToShow={filteredData}
        colorByAttackType={colorByAttackType}
      />

      <ReactPopup
        modal
        trigger={
          <button type="button" className={styles.reportButton}>
            Reportá
          </button>
        }
        position="center center"
      >
        <ReportPopupContent />
      </ReactPopup>
      {selectedAttacks.map((attack) => (
        <AttackDetail
          key={attack.id}
          colorByAttackType={colorByAttackType}
          className={styles.attackDetail}
          attack={attack}
          closeById={(attackId) => () =>
            removeAttackFromSelectedAttacks(attackId)
          }
        />
      ))}

      <div className={styles.desktopNumberAndFilters}>
        <div className={styles.visibleCasesSummary}>
          <NumberOfAttacks
            number={filteredData.length}
            className={styles.numberOfAttacks}
          />
          <button
            className={styles.floatingButtonWithIcon}
            type="button"
            title="Descargar datos filtrados"
            onClick={onDownloadDataRequest(serializableFilteredAttacks)}
          >
            <GoDownload size={16} />
          </button>
        </div>
        <FiltersByType
          className={styles.desktopFiltersByType}
          tipoFilters={tipoFilters}
          setTipoFilters={setTipoFilters}
          colorByAttackType={colorByAttackType}
          size="large"
        />
      </div>
      <MonthsSlider // Desktop only
        className={styles.desktopMonthsSlider}
        boundaryDates={boundaryDates}
        setFilterDates={setDates}
      />

      <Drawer // Mobile-only
        className={styles.mobileFiltersDrawer}
        bottom={
          MOBILE_NAVBAR_CONSTANTS.BOTTOM_MARGIN_TO_MAKE_ROOM_FOR_BOTTOM_NAVBAR
        }
        open={drawerIsOpen}
        visibleContent={
          <div>
            <FiltersByType
              tipoFilters={tipoFilters}
              setTipoFilters={setTipoFilters}
              colorByAttackType={colorByAttackType}
            />
            <MonthsSlider
              boundaryDates={boundaryDates}
              setFilterDates={setDates}
            />
          </div>
        }
        hiddenContent={undefined}
        toggleDrawerIsOpen={toggleDrawerIsOpen}
        numberOfCases={filteredData.length}
        onDownloadDataRequest={onDownloadDataRequest(
          serializableFilteredAttacks,
        )}
      />
    </article>
  );
}

export default Landing;
