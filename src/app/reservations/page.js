"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./reservations.module.css";
const basePath = process.env.basePath;
import { getReservation } from "@/services";
import {
  Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, EventSettingsModel, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { timelineResourceData } from './datasource';

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5WdkxhWH5bc3JRQGJf"
);

const Reservations = () => {
  const eventSettings = { dataSource: timelineResourceData };
  const group = { byGroupID: false, resources: ['Projects', 'Categories'] };

  const projectData = [
    { text: 'Reservations', id: 1, color: '#cb6bb2' }
  ];

  return (
  <div className={styles.container}>
    <div className={styles.formContainer}>
      <div className={styles.titleContainer}>Do you want to make a reservation?</div>
      <div className={styles.agendaContainer}>
      <ScheduleComponent width='75%' height='450px' currentView='Week' selectedDate={new Date()} eventSettings={eventSettings} group={group} >
        <ViewsDirective>
          <ViewDirective option='Week' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        <ResourcesDirective>
          <ResourceDirective field='ProjectId' title='Choose Project' name='Projects' allowMultiple={false}
            dataSource={projectData} textField='text' idField='id' colorField='color'>
          </ResourceDirective>
        </ResourcesDirective>
        <Inject services={[Week, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
    </div>
  </div>
);
  
}

export default Reservations;
