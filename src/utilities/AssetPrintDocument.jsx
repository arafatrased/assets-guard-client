import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
    color: '#555',
  },
});

const AssetPrintDocument = ({ request }) => {
  console.log(request);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Asset Request Details</Text>
        </View>
        <View style={styles.section}>
          <Text>Asset Name: {request.product_name}</Text>
          <Text>Asset Type: {request.product_type}</Text>
          {/* <Text>Requester Name: {request.userName}</Text> */}
          <Text>Requester Email: {request.userId}</Text>
          <Text>Request Date: {request.requestDate}</Text>
          {/* <Text>Additional Note: {request.note || 'N/A'}</Text> */}
          <Text>Status: {request.status}</Text>
          {request.approvalDate && <Text>Approval Date: {request.approvalDate}</Text>}
        </View>
        <View style={styles.footer}>
          <Text>Company Name</Text>
          <Text>Printed on {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default AssetPrintDocument;
