import React from "react"
import moment from "moment";

export default function AppointmentsComponent(props) {
    const [selectedSchedule, setSelectedSchedule] = React.useState(props.schedules[0]);
    console.log(selectedSchedule)
    const [slots, setSlots] = React.useState([]);
    const [appointmentsPerDay, setAppointmentsPerDay] = React.useState([]);

    let arrayOfSlotsToGenerate = [];

    React.useEffect(() => {
        let start = new Date(selectedSchedule.startTime);
        const end = new Date(selectedSchedule.endTime);
        const lastSlotBeginning = moment(end).subtract(20, 'minutes');
        const lastAsTimestamp = moment(lastSlotBeginning).format("X");

        arrayOfSlotsToGenerate.push(moment(start).format("HH:mm"))
        do {
            start = moment(start).add(20, 'minutes');
            arrayOfSlotsToGenerate.push(moment(start).format("HH:mm"));
        } while (moment(start).format("X") < lastAsTimestamp )

        setSlots(arrayOfSlotsToGenerate)

    }, [selectedSchedule])

    const appointmentElements = slots.map((val, i) => {
        return(
            <div key={i} className="app-slot">{val}</div>
        )
    })

    const schedulesAsOptions = props.schedules.map((val, i) => {

        return(
            <option value={val.id} key={i}>
                {val.scheduleDate}
            </option>
        )
    })

    function handleChange(event) {
        const {value} = event.target;
        setSelectedSchedule(prevSelectedSchedule => {
            return props.schedules.find(x => x.id == value)
        })
        //
        // const fetchData = async () => {
        //     const result = await fetch('http://localhost:8080/api/appointments/schedule/' + selectedSchedule.id)
        //     return result.json();
        // }
        // fetchData()
        //     .then(data => {appointmentsPerDay([...data])});


    }

    return(
        <div>
            <h3>Доктор: <span className="underlined">{props.doctor.fullName}</span>, услуга: <span className="underlined">{props.service.title}</span></h3>
            <div>
                <div>
                    <select
                        className="appointment-select"
                        name="selectedSchedule"
                        onChange={handleChange}
                        value={selectedSchedule.id}
                    >
                        {schedulesAsOptions}
                    </select>
                </div>
                <div className="slots-container">
                    {appointmentElements}
                </div>
            </div>
        </div>
    )
}