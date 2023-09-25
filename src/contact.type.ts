
export type contactType = {
    ID: number,
    InfoID: number,
    Info: {
        ID: number,
        DefaultEmailID: number,
		DefaultPhoneID: number,
		InvoiceAddressID: number,
		Name: string,
		DefaultPhone: {
			ID: number,
			BusinessRelationID: number,
			CountryCode: string,
			Description: string,
			Number: string,
			Type: string,
		},
		DefaultEmail: {
			ID: number,
			BusinessRelationID: number,
			Deleted: boolean,
			Description: null,
			EmailAddress: string,
		},
		InvoiceAddress: {
			ID: number,
			AddressLine1: string,
			AddressLine2: string,
			AddressLine3: string,
			BusinessRelationID: number,
			City: string,
		    Country: string,
			CountryCode: string,
			PostalCode: string,
			Region: null,
		}
	},
	Comment: string,
}