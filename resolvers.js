import { fetchBudgetById, fetchBudgets, fetchGuests, saveBudget } from './mongodb.js';
import { GraphQLError } from 'graphql';

export const resolvers = {

    // all the queries
    Query: {
        budgets: async () => {
            try {
                // Call the fetchBudgets function to get data from the database
                const budgets = await fetchBudgets();
                if (!budgets) {
                    throw new GraphQLError('No budget found')
                }
                return budgets;
              } catch (error) {
                console.error('Error fetching budgets:', error);
                throw error; // You can handle the error as needed
              }
        },
        guests: async () => {
            try {
                const guests = await fetchGuests();
                return guests;
            } catch (error) {
                console.error('Error fetching guests:', error);
                throw error; // You can handle the error as needed
              }
        },
        budget: async (_root, {_id}) => {
            const budget =  await fetchBudgetById(_id);
            if(!budget) {
                throw notFoundError('No budget found with id ' + _id);
            }
            return budget;
        },
    },

    Mutation: {
        saveBudget: async (_root, {input: {_id, expenseType, expense, estimatedPrice, assignedTo} }) => {
            const id = _id;
            try {
              const result = await saveBudget({ id, expenseType, expense, estimatedPrice, assignedTo });
              console.log({result});
              return result; // Return the result from saveBudget
            } catch (error) {
              console.error('Error in saveBudget resolver:', error);
              throw error; // Throw the error to propagate it up
            }
          },
    },

    // field-resolver functions
    Budget: {
        lastUpdatedDate: (budget) => {
            return getLastUpdatedDate(budget.lastUpdatedDate);
        }, 
    },
    // Guest: {
    //     attendee: (guest) => {
    //         return getAttendee(guest);
    //     },
    // },
};

function getLastUpdatedDate(ToformatDate) {
    const date = new Date(ToformatDate);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
    const day = date.getUTCDate();
    const lastUpdatedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return lastUpdatedDate
}

function notFoundError(message) {
    throw new GraphQLError(message, {
        extensions: {code: 'Not_Found'},
    })
}