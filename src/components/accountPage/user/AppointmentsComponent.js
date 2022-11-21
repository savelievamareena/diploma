import React from "react"
import moment from "moment";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";

export default function AppointmentsComponent(props) {
    const navigate = useNavigate();

    const [cookies] = useCookies();
    const [selectedSchedule, setSelectedSchedule] = React.useState(props.schedules[0]);
    const [appointmentsPerDay, setAppointmentsPerDay] = React.useState([]);
    const appointmentDuration = 20;

    const [slots, setSlots] = React.useState([]);
    const [formData, setFormData] = React.useState({
        userId: cookies.userId,
        beginning: "",
        scheduleId: selectedSchedule.id,
        serviceId: props.service.id,
    })

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/appointments/schedule/' + selectedSchedule.id)
            return result.json();
        }
        fetchData()
            .then(data => {
                console.log(data);
                setAppointmentsPerDay([...data])
            });
    }, [selectedSchedule])

    let arrayOfSlotsToFilter = [];

    React.useEffect(() => {
        let start = new Date(selectedSchedule.startTime);
        const end = new Date(selectedSchedule.endTime);
        const lastAppointmentBeginning = moment(end).subtract(appointmentDuration, 'minutes');
        const lastAppointmentAsTimestamp = moment(lastAppointmentBeginning).format("X");

        arrayOfSlotsToFilter.push(moment(start).format("HH:mm"))
        while (moment(start).format("X") < lastAppointmentAsTimestamp) {
            start = moment(start).add(appointmentDuration, 'minutes');
            arrayOfSlotsToFilter.push(moment(start).format("HH:mm"));
        }

        //select free slots to show
        const slotsToShow = arrayOfSlotsToFilter.filter(function(x) {
            let slotIsTaken = false;
            for (let i = 0; i < appointmentsPerDay.length; i++) {
                if(x === appointmentsPerDay[i].beginning) {
                    slotIsTaken = true;
                    break;
                }
            }
            return !slotIsTaken;
        })
        setSlots([...slotsToShow])

    }, [selectedSchedule, appointmentsPerDay])

    function handleSelectAppointment(event) {
        setFormData(prevState => {
            return{
                ...prevState,
                beginning: event.target.innerText,
                scheduleId: selectedSchedule.id
            }
        })
    }

    async function handleSubmit() {
        if(formData.beginning === "") {
            alert("Выберите временной слот");
        }else {
            const res = await fetch("http://localhost:8080/api/appointments", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const resJson = await res.json();
            if (res.status === 200) {
                navigate("/account/visits")
            } else {
                console.log(resJson.message);
            }
        }
    }

    const appointmentElements = slots.map((val, i) => {
        return(
            <div key={i} className="app-slot"
                 onClick={handleSelectAppointment}
                 style={{backgroundColor: formData.beginning === val ? '#c7e4ee' : 'white' }}
            >
                {val}
            </div>
        )
    })

    const schedulesAsOptions = props.schedules.map((val, i) => {
        return(
            <option value={val.id} key={i} >
                {val.scheduleDate}
            </option>
        )
    })

    function handleChange(event) {
        const {value} = event.target;
        setSelectedSchedule(prevSelectedSchedule => {
            return props.schedules.find(x => x.id == value)
        })

        setFormData({
            userId: cookies.userId,
            beginning: "",
            scheduleId: selectedSchedule.id,
            serviceId: props.service.id,
        })
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
            <div >
                <button type="button" onClick={handleSubmit} className="app-submit-button">Назначить визит</button>
            </div>
        </div>
    )
}