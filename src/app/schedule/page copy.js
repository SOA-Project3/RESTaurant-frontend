"use client";
import { useRef } from 'react';
import React, { useEffect, useState } from "react";
import styles from "./schedule.module.css";
const basePath = process.env.basePath;
import { getReservation } from "@/services";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { ScheduleComponent, Day, Week, Agenda, Inject, ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";
import { scheduleData } from './datasource';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { L10n } from '@syncfusion/ej2-base';
import { Internationalization } from '@syncfusion/ej2-base';

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5WdkxhWH5bc3JRQGJf"
);

L10n.load({
  'en-US': {
      'schedule': {
        'addTitle' : 'Espacio Disponible'
      }
  }
});


const Schedule = () => {
  const [scheduleObj, setScheduleObj] = useState({
    Id: 0,
    StartTime: ' ',
    EndTime: ' ',
    Name: "Sin asignar", 
    AmountOfPeople: 0
    });
  const instance = new Internationalization();

  const onPopupOpen = (args) => {
    if (args.type === 'Editor') {
      args.duration = 120;
    }
  }

  const buttonClickActions = (e) => {
    let eventData = {};
    let actionType = "Add";
    const action = e.target.id;

    const getSlotData = () => {
      const cellDetails = scheduleObj.current.getCellDetails(scheduleObj.current.getSelectedElements());
      const eventData = scheduleObj.current.eventWindow.getObjectFromFormData("e-quick-popup-wrapper");
      const addObj = {};
      addObj.Id = scheduleObj.current.getEventMaxID();
      addObj.StartTime = new Date(+cellDetails.startTime);
      addObj.EndTime = new Date(+cellDetails.startTime);
      addObj.EndTime.setHours(addObj.EndTime.getHours() + 2);
      addObj.Name = "Sin asignar";
      addObj.AmountOfPeople = scheduleObj.current.AmountOfPeople;
      return addObj;
    };


    switch (action) {
      case "add":
        eventData = getSlotData();
        scheduleObj.current.addEvent(eventData);
        break;
      case "edit":
      case "edit-series":
        eventData = scheduleObj.current.activeEventData.event;
        actionType = eventData.RecurrenceRule ? action === "edit" ? "EditOccurrence" : "EditSeries" : "Save";
        if (actionType === "EditSeries")
          eventData = scheduleObj.current.eventBase.getParentEvent(eventData, true);

        scheduleObj.current.openEditor(eventData, actionType);
        break;
      case "delete":
      case "delete-series":
        eventData = scheduleObj.current.activeEventData.event;
        actionType = eventData.RecurrenceRule ? action === "delete" ? "DeleteOccurrence" : "DeleteSeries" : "Delete";
        if (actionType === "DeleteSeries")
          eventData = scheduleObj.current.eventBase.getParentEvent(eventData, true);

        scheduleObj.current.deleteEvent(eventData, actionType);
        break;
      case "more-details":
        eventData = getSlotData();
        scheduleObj.current.openEditor(eventData, "Add", true);
        break;
      default:
        break;
    }
    scheduleObj.current.closeQuickInfoPopup();
  }

  const header = (props) => {
    return (
      <div>
        {props.elementType === "cell" ? (
          <div className="e-cell-header e-popup-header">
            <div className="e-header-icon-wrapper">
              <button id="close" className="e-close e-close-icon e-icons" title="Close" onClick={buttonClickActions.bind(this)} />
            </div>
          </div>
        ) : (
          <div className="e-event-header e-popup-header">
            <div className="e-header-icon-wrapper">
              <button id="close" className="e-close e-close-icon e-icons" title="CLOSE" onClick={buttonClickActions.bind(this)} />
            </div>
          </div>
        )}
      </div>
    );
  }


  const content = (props) => {
    return (
      props !== undefined ? (
        <table className="custom-event-editor">
          <tbody>
            <tr>
              <td className="e-textlabel">Time</td>
              <td colSpan={4}>
                <DateTimePickerComponent
                  format='dd/MM/yy hh:mm a'
                  id="Time"
                  data-name="Time"
                  value={new Date(props.startTime || props.StartTime)}
                  className="e-field"
                />
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">People</td>
              <td colSpan={4}>
                <DropDownListComponent
                  id="AmountOfPeople"
                  placeholder='Choose Max People'
                  data-name="People"
                  className="e-field"
                  dataSource={[1, 2, 3, 4, 5, 6]}
                  value={props.AmountOfPeople}
                  onChange={(args) => console.log(props)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      ) : <div></div>
    );
  }

  
  const footer = (props) => {
    return (
      <div>
        {props.elementType === "cell" ? (
          <div className="e-cell-footer">
            <div className="right-button">
              <button id="add" className="e-event-create" title="Add" onClick={buttonClickActions.bind(this)} > Add </button>
            </div>
          </div>
        ) : (
          <div className="e-event-footer">
            <div className="left-button">
              <button id="edit" className="e-event-edit" title="Edit" onClick={buttonClickActions.bind(this)} > Edit </button>
              {!isNullOrUndefined(props.RecurrenceRule) &&
                props.RecurrenceRule !== "" ? (
                <button id="edit-series" className="e-edit-series" title="Edit Series" onClick={buttonClickActions.bind(this)}> Edit Series </button>
              ) : (
                ""
              )}
            </div>
            <div className="right-button">
              <button id="delete" className="e-event-delete" title="Delete" onClick={buttonClickActions.bind(this)} > Delete </button>
              {!isNullOrUndefined(props.RecurrenceRule) &&
                props.RecurrenceRule !== "" ? (
                <button id="delete-series" className="e-delete-series" title="Delete Series" onClick={buttonClickActions.bind(this)}> Delete Series </button>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

const onActionBegin = (args) => {
  if (args.requestType === 'eventCreate' && args.data.length > 0) {
    let eventData = args.data[0];
    let eventField = scheduleObj.current.eventFields;
    let startDate = eventData[eventField.startTime];
    let endDate = eventData[eventField.endTime];
    args.cancel = !scheduleObj.current.isSlotAvailable(startDate, endDate);
  }
}

const getTimeString = (value) => {
  return instance.formatDate(value, { skeleton: 'hm' });
}

const eventTemplate = (props) => {
  return (
    <div className={styles.eventTemplate} >
      <div className={styles.title}>
        <strong>{props.Name}</strong>
      </div>
      <div className={styles.details}>
        <span className={styles.time}>{getTimeString(props.StartTime)} - {getTimeString(props.EndTime)}</span>
        <span className={styles.maxPeople}>Max People: {props.AmountOfPeople}</span>
      </div>
    </div>
  );
}

const fieldsData = {
  id: 'Id',
  startTime: { name: 'StartTime', title: 'Start Duration' },
  endTime: { name: 'EndTime', title: 'End Duration' },
  name: { name: 'Name', title: 'Reservation Name' },
  amountOfPeople: { name: 'Max People', title: 'Max People' }
  
}

  const quickInfoTemplates = { header: header.bind(this), content: content.bind(this), footer: footer.bind(this)};
  const eventSettings = { dataSource: scheduleData, template: eventTemplate, fieldsData: fieldsData};


  return (
<div className={styles.container}>
    <div className={styles.formContainer}>
      <div className={styles.titleContainer}>These are the spaces you have made available</div>
      <div className={styles.agendaContainer}>
      <ScheduleComponent id="schedule" ref={scheduleObj} width="100%" height="450px" selectedDate={new Date()} eventSettings={eventSettings} quickInfoTemplates={quickInfoTemplates} popupOpen={onPopupOpen} actionBegin={onActionBegin.bind(this)}>
        <ViewsDirective>
          <ViewDirective option='Week'/>
          <ViewDirective option='Agenda'/>
        </ViewsDirective>
        <Inject services={[Week, Agenda]}/>
      </ScheduleComponent>
    </div>
    </div>
  </div>
);
  
}

export default Schedule;
