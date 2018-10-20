import faker from 'faker'
import addMinutes from 'date-fns/fp/addMinutes'
import ServiceCall from '../../../api/service-calls/model'

const startedAtDate = new Date()

export const createServiceCallDry = ({
  id = faker.random.uuid(),
  description = faker.lorem.sentences(3),
  callRating = faker.random.number(5),
  serviceRating = faker.random.number(5),
  isSolved = faker.random.boolean(),
  startedAt = startedAtDate,
  endedAt = addMinutes(faker.random.number(120), startedAtDate),
  customerId,
  userId
} = {}) => ({
  id,
  description,
  callRating: (userId && endedAt) ? callRating : 0,
  serviceRating: (userId && endedAt) ? serviceRating : 0,
  isSolved: (userId && endedAt) ? isSolved : false,
  startedAt: userId ? startedAt : undefined,
  endedAt: userId ? endedAt : undefined,
  customerId,
  userId
})

export const createServiceCallsDry = data =>
  data.map(serviceCall => createServiceCallDry(serviceCall))

export const createServiceCall = data =>
  ServiceCall.query().insert(createServiceCallDry(data)).returning('*')

export const createServiceCalls = data =>
  ServiceCall.query().insert(createServiceCallsDry(data)).returning('*')
