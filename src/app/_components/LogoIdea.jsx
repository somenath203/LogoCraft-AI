'use client';

import { useState } from 'react';
import axios from 'axios';
import { Loader2Icon, Sparkles } from 'lucide-react';


import Prompt from '@/app/_data/prompt_data';
import pages_data from '../_data/pages_data';
import { Button } from '@/components/ui/button';
import HeadingDescComponent from './HeadingDescComponent';


const LogoIdea = ({ onHandleInputChange, allFormData }) => {


  const [ideas, setIdeas] = useState();

  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(allFormData?.logoidea);


  const generateLogoDesignIdea = async () => {

    setLoading(true);

    const PROMPT = Prompt.DESIGN_IDEA_PROMPT
                    .replace('{logoType}', allFormData?.logodesign?.title)
                    .replace('{logoTitle}', allFormData?.logotitle)
                    .replace('{logoDesc}', allFormData?.logodescription)
                    .replace('{logoPrompt}', allFormData?.logodesign?.prompt);

    const result = await axios.post('/api/ai-design-ideas', {
      prompt: PROMPT,
    });


    if (result.data.ideas) {

      setIdeas(result.data.ideas);

      setLoading(false);

    }
 

  };



  return (
    <div className="my-5">


      <HeadingDescComponent
        title={pages_data.LogoIdeaTitle}
        description={pages_data.LogoIdeaDesc}
      />

      <Button 
        className='flex items-center gap-2 mt-5'
        onClick={generateLogoDesignIdea}
        disabled={loading}
      >

        <Sparkles />
            
        <span>Generate Logo Ideas</span>

      </Button>
      

      <div className="flex items-center justify-center">

        {loading && <Loader2Icon className="animate-spin my-10" />}

      </div>


      <div className="flex flex-wrap gap-3 mt-6">

        {ideas && ideas.map((item, index) => (

            <h2
              key={index}
              onClick={() => {
                setSelectedOption(item);
                onHandleInputChange(item);
              }}
              className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${selectedOption == item && 'border-primary'}`}>
              
              {item}
            
            </h2>
          
          ))}

      </div>

    </div>
  );
};


export default LogoIdea;