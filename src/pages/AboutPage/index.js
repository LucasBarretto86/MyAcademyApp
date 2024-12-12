import React, { useCallback, useEffect, useState } from 'react'
import PrivateLayout from '../../layouts/PrivateLayout'
import { useCourses } from '../../hooks/courses/useCourses'
import CourseCard from '../../components/pages/CourseCard'
import { isMobile } from '../../utils/device'

const AboutPage = () => {
  return (
    <PrivateLayout>
      <div className="flex flex-col items-center gap-8 w-full">
        <h3 className="w-full text-center text-marine">About</h3>

        <div className="flex flex-col gap-4 w-full lg:text-left text-center">
          <h5>My Academy</h5>

          <p>Hello World!!</p>

          <p>This is a small application to showcase a bit of my code to the world!</p>

          <h6>Backend (API)</h6>
          <ul className="list-disc pl-[2ch]">
            <li>Ruby 3.3.0</li>
            <li>Rails 7.1.5</li>
            <li>JWT</li>
            <li>Rspec</li>
            <li>Docker</li>
            <li>Git Actions</li>
          </ul>

          <h6>Frontend (SPA) - Separate module</h6>
          <ul className="list-disc pl-[2ch]">
            <li>React 18 (CRA)</li>
            <li>Yarn</li>
            <li>Tailwind</li>
            <li>SASS</li>
          </ul>

          <h5>Project Overview</h5>

          <p>This project aims to enhance the user experience for exploring and managing courses on a web platform. The primary
            objectives are to provide an intuitive interface for users to view active courses, ensure responsiveness for mobile
            devices, and streamline administrative tasks for managing course data. Additionally, the project includes features for
            reporting and monitoring the total video storage used by courses.</p>

          <h5>Core Features</h5>

          <ol className="list-decimal pl-[2ch]">
            <li>
              <strong>Homepage with Active Course Listings</strong>
              <ul className="list-disc pl-[2ch]">
                <li>Displays a responsive list of courses that are currently active.</li>
                <li>Each course showcases its title and description.</li>
                <li>Filters out courses based on their end date to only display those still available.</li>
              </ul>
            </li>

            <li>
              <strong>Responsive Design</strong>
              <ul className="list-disc pl-[2ch]">
                <li>Optimized layout for seamless functionality across devices, with a focus on mobile usability.</li>
              </ul>
            </li>
            <li>
              <strong>Course Management</strong>
              <ul className="list-disc pl-[2ch]">
                <li>A robust interface for creating, editing, and deleting courses.</li>
                <li>Includes a detailed form to manage course information.</li>
              </ul>
            </li>

            <li>
              <strong>Video Storage Reporting</strong>
              <ul className="list-disc pl-[2ch]">
                <li>Provides insights into the total storage occupied by videos in all courses.</li>
                <li>Reports can be presented in various formats, such as queries, visualizations, or standalone dashboards.</li>
              </ul>
            </li>
          </ol>


          <p>This project balances user-centric design with practical administrative tools to improve overall system efficiency and
            usability.</p>
        </div>
      </div>
    </PrivateLayout>
  )
}

export default AboutPage
