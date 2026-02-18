import streamlit as st
import folium
import json

def display_geo_features(region):
    """Displays geographical features based on the selected region."""
    features = {
        "北部": {
            "description": "北部地區擁有豐富的丘陵地貌，氣候濕潤。",
            "knowledge_points": "北部平原是重要的農業區。"
        },
        "中部": {
            "description": "中部地區以高山和盆地為主，地形多樣。",
            "knowledge_points": "中央山脈是台灣最高山脈。"
        },
        "南部": {
            "description": "南部地區平原廣闊，氣候溫暖乾燥。",
            "knowledge_points": "南部是重要的工業和農業基地。"
        },
        "東部": {
            "description": "東部地區多為狹長的海岸山脈和縱谷平原。",
            "knowledge_points": "花東縱谷是獨特的地質景觀。"
        },
        "離島": {
            "description": "離島地區包含多個島嶼，地質構造各異。",
            "knowledge_points": "澎湖群島以玄武岩景觀聞名。"
        }
    }
    if region in features:
        st.subheader(f"{region} 地理特徵")
        st.write(features[region]["description"])
        st.subheader("知識點")
        st.write(features[region]["knowledge_points"])
    else:
        st.write("請選擇一個地區以查看詳細資訊。")

def create_map_component():
    st.title("台灣地理分區互動地圖")

    # --- Map Creation (using Folium) ---
    # Center of Taiwan
    map_center = [23.5, 120.8]
    taiwan_map = folium.Map(location=map_center, zoom_start=7)

    # Placeholder data for regions and their approximate centers
    regions = {
        "北部": {"coords": [25.0340, 121.5645], "popup": "北部"},
        "中部": {"coords": [24.1400, 120.6736], "popup": "中部"},
        "南部": {"coords": [22.9996, 120.2231], "popup": "南部"},
        "東部": {"coords": [23.9739, 121.6051], "popup": "東部"},
        "離島": {"coords": [23.5, 119.8], "popup": "離島"} # Approximate center for outer islands
    }

    # Adding markers for each region
    # Note: Direct triggering of Streamlit elements from Folium marker clicks
    # in a simple embed is not straightforward. We use a Streamlit selectbox
    # for region selection and display the map as a static HTML element.
    for region, data in regions.items():
        folium.Marker(
            location=data["coords"],
            popup=data["popup"],
            tooltip=region # Show region name on hover
        ).add_to(taiwan_map)

    # Save map to HTML and display in Streamlit
    map_html = taiwan_map._repr_html_()
    st.components.v1.html(map_html, height=500)

    # --- Interactive Selection for Geographical Features ---
    st.subheader("選擇地區以查看地理特徵")
    selected_region = st.selectbox(
        "請選擇地區",
        options=["北部", "中部", "南部", "東部", "離島", "請選擇"],
        index=len(["北部", "中部", "南部", "東部", "離島", "請選擇"]) - 1 # Default to "請選擇"
    )

    if selected_region != "請選擇":
        display_geo_features(selected_region)
    else:
        st.write("請選擇一個地區以查看詳細資訊。")


# --- Main execution ---
if __name__ == "__main__":
    create_map_component()
