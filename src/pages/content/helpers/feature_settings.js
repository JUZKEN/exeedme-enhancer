import storage from '../../../shared/storage';

export const isFeatureEnabled = async option => {
   const options = await storage.getAll()
   return options[option]
}

export const runIfFeatureEnabled = async (option, feature, parent) => {
   const featureEnabled = await isFeatureEnabled(option)
   if (featureEnabled) feature(parent);
}