import React, { useEffect, useState } from 'react';
import Card from './Card';
import DarkLight from './DarkLight';
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";


const App = () => {
  // Handeling dropdown :

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Data Fetching :
  const [data, setData] = useState({ tickets: [], users: [] });
  const API = 'https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers';

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // Ordering & Sorting :

  const [selectGroupBy, setSelectGroupBy] = useState('User');
  const [selectOrderBy, setSelectOrderBy] = useState('Priority');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const groupedData = groupData(data.tickets, selectGroupBy);
    setFilterData(groupedData);
  }, [selectGroupBy, selectOrderBy, data.tickets]);

  const groupData = (tickets, groupBy) => {
    if (groupBy === 'Status') {
      return groupByStatus(tickets);
    } else if (groupBy === 'User') {
      return groupByUser(tickets, selectOrderBy);
    } else if (groupBy === 'Priority') {
      return groupByPriority(tickets);
    }
  };

  const groupByStatus = (tickets) => {
    const groupedData = {};

    tickets.forEach((ticket) => {
      const statusKey = ticket.status || 'Unknown Status';

      if (!groupedData[statusKey]) {
        groupedData[statusKey] = [];
      }
      groupedData[statusKey].push(ticket);
    });

    return groupedData;
  };

  const groupByUser = (tickets, orderBy) => {
    const groupedData = {};

    tickets.forEach((ticket) => {
      const user = data.users.find((u) => u.id === ticket.userId);
      const userKey = user ? user.name : 'Unknown User';

      if (!groupedData[userKey]) {
        groupedData[userKey] = [];
      }
      groupedData[userKey].push(ticket);
    });

    for (const userKey in groupedData) {
      groupedData[userKey] = sortTickets(groupedData[userKey], orderBy);
    }

    return groupedData;
  };

  const groupByPriority = (tickets) => {
    // Define the order of priority labels
    const priorityOrder = ['Urgent', 'High', 'Medium', 'Low', 'No priority'];

    // Initialize an empty object to store grouped data
    const groupedData = {};

    // Iterate through each priority label in the specified order
    priorityOrder.forEach((priorityLabel) => {
      // If the priority label doesn't exist in groupedData, create an empty array for it
      if (!groupedData[priorityLabel]) {
        groupedData[priorityLabel] = [];
      }

      // Iterate through each ticket and add it to the corresponding priority group
      tickets.forEach((ticket) => {
        if (getPriorityLabel(ticket.priority) === priorityLabel) {
          groupedData[priorityLabel].push(ticket);
        }
      });

      // Sort the tickets within the current priority group based on the selected order
      groupedData[priorityLabel] = sortTickets(groupedData[priorityLabel], selectOrderBy);
    });

    // Return the final grouped and sorted data
    return groupedData;
  };


  const sortTickets = (tickets, orderBy) => {
    if (orderBy === 'Priority') {
      tickets.sort((a, b) => a.priority - b.priority);
    } else if (orderBy === 'Title') {
      tickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    return tickets;
  };

  const getPriorityLabel = (priority) => {
    const priorityLabels = {

      0: 'No priority',
      1: 'Low',
      2: 'Medium',
      3: 'High',
      4: 'Urgent',
    };
    return priorityLabels[priority] || 'Unknown Priority';
  };

  return (
    <div className='w-[100%] m-auto mt-2'>
      <div className="flex justify-between ">
        <button
          type="button"
          className="ml-5 inline-flex justify-center  px-4 py-2 text-sm font-medium rounded-md border-[1px] border-gray-400 border-solid "
          onClick={toggleDropdown}
        >
          Display
        </button>
        <DarkLight />
      </div>
      {isOpen && (
        <div className='fixed ml-5 bg-white p-5 border-[1px] border-gray-400 border-solid rounded-md mt-1 '>
          <div className='flex justify-around gap-5'>
            <p>Grouping</p>
            <select
              value={selectGroupBy}
              onChange={(e) => setSelectGroupBy(e.target.value)}
              className='bg-[#F5F5F5] p-1 rounded-md border-[1px] border-gray-400 border-solid'
            >
              <option value="User">User</option>
              <option value="Status">Status </option>
              <option value="Priority">Priority</option>
            </select>
          </div>
          <div className='flex justify-around gap-5 pt-5 pb-0'>
            <p>Ordering</p>
            <select
              value={selectOrderBy}
              onChange={(e) => setSelectOrderBy(e.target.value)}
              className='bg-[#F5F5F5] p-1 rounded-md border-[1px] border-gray-400 border-solid'
            >
              <option value="Priority">Priority</option>
              <option value="Title">Title </option>
            </select>
          </div>
        </div>
      )}

      <div className='bg-gray-100 '>
        <div className="flex w-[97%] m-auto gap-3 flex-wrap pb-10 mt-2 max-md:justify-center">
          {Object.entries(filterData).map(([groupKey, tickets]) => (
            <div key={groupKey} >
              <div className='flex justify-between p-2'><p className='font-semibold'>{groupKey }<span className='font-normal text-gray-500'> {tickets.length}</span></p><p className='flex gap-2 pt-2'> <FaPlus /><BsThreeDots /></p> </div>
              
              {tickets.map((ticket) => (
                <div className='pt-2 '>
                  <Card key={ticket.id} data={ticket} />
                  </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
