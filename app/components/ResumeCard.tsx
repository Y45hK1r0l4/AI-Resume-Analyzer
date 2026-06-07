import { Link } from 'react-router-dom'
import ScoreCircle from './scoreCircle'

export default function ResumeCard({resume}: {resume: Resume}) {
  return (
    <Link to={`/resume/${resume.id}`} className="resume-card animate-in fade-in duration-1000">

        <div className='resume-card-header'>
            <div className="flex flex-col gap-2">
                <h2 className="!test-black font-bold break-words">
                    {resume.companyName}
                </h2>
                <h3 className="text-lg break-wrods text-gray-500">
                    {resume.jobTitle}
                </h3>
            </div>

            <div className='flex-shrink-0'>
                <ScoreCircle score={resume.feedback.overallScore} />
            </div>

        </div>

        <div className='gradient-border animate-in fade-in duration-1000'>
            <div className='w-full h-full'>
                <img 
                    src={resume.imagePath}
                    alt="resume"
                    className='w-full h-[350px] max-sm:h-[200px] object-cover object-top'
                />
            </div>
        </div>


        

    </Link>
  )
}

