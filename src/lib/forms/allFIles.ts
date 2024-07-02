import { asfFiles } from "./asf/fields";
import { atiFiles } from "./ati/fields";
import { aufFiles } from "./auf/fields";
import { cascFiles } from "./casc/fields";
import { deafFilesFieldsArray } from "./deaf/fields";
import { dlaFiles } from "./dla/fields";
import { dofFiles } from "./dof/fields";
import { piscFiles } from "./pisc/fields";
import { IField } from "./fields";
import { lpcaFilesFieldsArray } from "./lpca/fields";

const lpcaFiles = lpcaFilesFieldsArray;

export const allFiles: { [key: string]: IField[] } = {
    "ati_files": atiFiles,
    "auf_files": aufFiles,
    "dla_files": dlaFiles,
    "dof_files": dofFiles,
    "lpca_files": lpcaFiles,
    "casc_files": cascFiles,
    "pisc_files": piscFiles,
    "asf_files": asfFiles,
    "deaf_files": deafFilesFieldsArray
};
