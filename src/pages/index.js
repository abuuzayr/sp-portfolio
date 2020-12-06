import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { Transition } from "react-transition-group"
import { FiX } from "react-icons/fi"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Intro from "../components/intro"
import Work from "../components/work"
import Approach from "../components/approach"
import Projects from "../components/projects"
import Profile from "../components/profile"

const transitionStyles = {
  entering: { opacity: 0, display: "block" },
  entered: { opacity: 0.75, display: "block" },
  exiting: { display: "block"},
  exited: {},
}

const indexQuery = graphql`
  query {
    allPrismicHomepage {
      nodes {
        data {
          hero_text {
            text
          }
          intro_section_title {
            text
          }
          intro_section_text {
            text
          }
          intro_button_text {
            text
          }
          intro_button_url {
            url
          }
          work_section_title {
            text
          }
          work_experience {
            company {
              text
            }
            duration {
              text
            }
            position {
              text
            }
            long_description {
              html
            }
          }
          approach_section_link_text {
            text
          }
          approach_section_text {
            text
          }
          approach_section_title {
            text
          }
          approach_section_link_url {
            url
          }
          project_section_title {
            text
          }
          project_button_text {
            text
          }
          project_button_url {
            url
          }
        }
      }
    }
  }
`

const IndexPage = () => {
  const [overlay, setOverlay] = useState(false)
  return (
    <StaticQuery
      query={indexQuery}
      render={data => {
        const {
          hero_text, 
          intro_section_title, 
          intro_section_text, 
          intro_button_text, 
          intro_button_url,
          work_section_title,
          work_experience,
          approach_section_link_text,
          approach_section_link_url,
          approach_section_text,
          approach_section_title,
          project_section_title,
          project_button_text,
          project_button_url
        } = data.allPrismicHomepage.nodes[0].data
        return (
          <Layout>
            <Transition in={overlay} timeout={300}>
              {state => (
                <div
                  style={{
                    transition: "all 300ms ease-in-out",
                    opacity: 0,
                    display: "none",
                    ...transitionStyles[state],
                  }}
                  className="bg-black h-screen w-screen fixed top-0 left-0"
                >
                  <FiX
                    size={30}
                    color="white"
                    className="absolute top-0 right-0 mr-10 mt-10 cursor-pointer"
                    onClick={() => setOverlay(false)}
                  />
                </div>
              )}
            </Transition>
            <SEO title="Home" overlay={overlay} />
            <Hero text={hero_text.text} />
            <Intro
              title={intro_section_title.text}
              text={intro_section_text.text}
              button={{
                text: intro_button_text.text,
                url: intro_button_url.url,
              }}
            />
            <Work title={work_section_title.text} nodes={work_experience} />
            <Approach
              title={approach_section_title.text}
              text={approach_section_text.text}
              button={{
                text: approach_section_link_text.text,
                url: approach_section_link_url.url,
              }}
            />
            <div class="md:flex my-40">
              <div class="md:w-1/4 w-full">
                <p className="font-bold text-blue-900 text-xl">
                  {project_section_title.text}
                </p>
              </div>
              <div class="md:w-3/4 w-full">
                <Projects tilesMode="dynamic" setOverlay={setOverlay} />
                <p className="mt-10">
                  <Link
                    to={project_button_url.url}
                    className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white"
                  >
                    {project_button_text.text}
                  </Link>
                </p>
              </div>
            </div>
            <Profile />
          </Layout>
        )
      }}
    />
  )
};

export default IndexPage
