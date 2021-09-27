/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Layout from "../../layout";
import { useQuery, useMutation } from "react-query";
import { getData } from "../../api";
import { Card, Col, Row, List, Button } from "antd";

const ProductList = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // Queries
  const categories = useQuery("/v1/category/top");
  useEffect(() => {
    if (!allCategory.length && categories.data) {
      setAllCategory(categories.data);
    }
  }, [categories]);
  const getChildren = async () => {
    let response = await getData(`/v1/category/childrens/${expandedId}`);

    if (response && response.data) {
      let _allCategory = [...allCategory];
      _allCategory[collapsedIndex].subcategories = response.data.categories;
      _allCategory[collapsedIndex].products = response.data.products;
      setAllCategory(_allCategory);
    }
  };

  const mutation = useMutation(getChildren, {});

  useEffect(() => {
    if (expandedId != null) mutation.mutate();
  }, [expandedId]);
  const handleClick = (item, i, type, k) => {
    if (type === "products") {
      let _allCategory = [...allCategory];
      if (k) {
        console.log(_allCategory[i]);
        // _allCategory[i].subcategories[k].productShow = true;
      } else {
        _allCategory[i].productShow = true;
      }
      setAllCategory(_allCategory);
    } else {
      setExpandedId(item._id);
      setCollapsedIndex(i);
    }
  };
  return (
    <Layout title="Product List">
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {allCategory.map((category, i) => (
            <Col span={8} key={category._id}>
              <Card title={category.name} bordered={true}>
                <List
                  size="small"
                  bordered={false}
                  dataSource={["subcategories", "products"]}
                  renderItem={(item) => (
                    <Button
                      type="link"
                      onClick={() => {
                        handleClick(category, i, item);
                      }}
                    >
                      {item}
                    </Button>
                  )}
                  grid={{ gutter: 16, column: 2 }}
                />
                {category.productShow && (
                  <List
                    size="small"
                    bordered={false}
                    dataSource={category.products}
                    renderItem={(item) => <List.Item>{item.name}</List.Item>}
                    grid={{ gutter: 16, column: 2 }}
                  />
                )}
                {category.subcategories.map((sub) => (
                  <>
                    <List
                      size="small"
                      bordered={false}
                      header={<div>{sub.name}</div>}
                      dataSource={["subcategories", "products"]}
                      renderItem={(item, k) => (
                        <Button
                          type="link"
                          onClick={() => {
                            handleClick(sub, i, item, k);
                          }}
                        >
                          {item}
                        </Button>
                      )}
                      grid={{ gutter: 16, column: 2 }}
                    />
                    {sub.productShow && (
                      <List
                        size="small"
                        bordered={false}
                        dataSource={sub.products}
                        renderItem={(item) => (
                          <List.Item>{item.name}</List.Item>
                        )}
                        grid={{ gutter: 16, column: 2 }}
                      />
                    )}
                  </>
                ))}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};
export default ProductList;
