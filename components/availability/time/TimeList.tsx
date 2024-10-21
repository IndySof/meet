import Time from "./TimeButton"
import { DateTimeIntervalString, DOCTORSConfType } from "@/lib/types"
import { useProvider } from "@/context/AvailabilityContext"

type TimeListProps = {
  availability: DateTimeIntervalString[],
  configSetDoctor:any
}

export default function TimeList({ availability, configSetDoctor }: TimeListProps) {
  const {
    state: { doctor, optionId },
  } = useProvider()

  const DOCTORS:DOCTORSConfType[] = configSetDoctor

  const doctorAll = DOCTORS.find(doctor => doctor.option.includes(0))?.user;

  const nbDoctor = DOCTORS.filter(theDoctor =>
    theDoctor.option.includes(optionId)
  ).length

  const availabilityFiltered = []

  if (availability)
  {
    for (let i = 0; i < availability.length; i++)
    {
      let doctorFlag = false
      let nbLoop = 0

      while (availability[i].doctor != "")
      {
        nbLoop++
        if(availability[i].doctor == doctor)
        {
          doctorFlag = true
        }
        if(availability[i].start == availability[i+1]?.start || (nbLoop == nbDoctor && doctorAll == doctor))
        {
          i++
        }
        else
        {
          nbLoop = 0
          break
        }
      }

      if (!doctorFlag)
      {
        availabilityFiltered.push({
          start:  availability[i].start,
          end:  availability[i].end
        });
      }
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {availabilityFiltered?.map((slot) => {
        return (
          <Time
            key={slot.start.toISOString() + slot.end.toISOString()}
            time={slot}
          />
        );
      })}
    </div>
  )
}