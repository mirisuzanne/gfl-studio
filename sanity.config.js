// sanity.config.js
import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision'
import schemas from './schemas/schema';
import deskStructure from './structure/deskStructure';
import { Logo } from './components/Logo';


export default defineConfig({
  title: "GrapefruitLab",
  projectId: "7jk93b9e",
  dataset: "production",
  plugins: [
    deskTool({
      structure: deskStructure
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
  studio: {
    components: {
      logo: Logo
    }
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId != 'settings')
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(({ action }) => !['unpublish', 'delete','duplicate'].includes(action))
      }
      return prev
    },
  },
});
